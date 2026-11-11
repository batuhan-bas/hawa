// Background service worker for Hawa
// Refreshes the weather, keeps the toolbar temperature current and sends rain alerts.

importScripts('shared.js');

const REFRESH_ALARM = 'refresh-weather';
const REFRESH_MINUTES = 30;
// Don't announce the same rain twice: wait this long after an alert.
const RAIN_ALERT_COOLDOWN_MS = 3 * 60 * 60 * 1000;

/* ───────── Alarms ───────── */
// Chrome may clear alarms when the browser restarts, so check on startup too.
async function ensureRefreshAlarm() {
  const existing = await chrome.alarms.get(REFRESH_ALARM);
  if (!existing) {
    await chrome.alarms.create(REFRESH_ALARM, { periodInMinutes: REFRESH_MINUTES });
  }
}

chrome.runtime.onInstalled.addListener(async () => {
  await ensureRefreshAlarm();
  refresh();
});

chrome.runtime.onStartup.addListener(async () => {
  await ensureRefreshAlarm();
  refresh();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === REFRESH_ALARM) refresh();
});

// Location, units or toggles changed in the popup.
chrome.storage.onChanged.addListener((changes) => {
  if (changes.settings) refresh();
});

/* ───────── Refresh ───────── */
async function refresh() {
  const settings = await loadSettings();
  if (settings.lat == null || settings.lng == null) {
    await chrome.action.setBadgeText({ text: '' });
    return;
  }

  let data;
  try {
    data = await fetchForecast(settings);
  } catch {
    return; // Keep the last badge and cache; the next alarm tries again.
  }

  await chrome.storage.local.set({
    cache: { lat: settings.lat, lng: settings.lng, unit: settings.unit, fetchedAt: Date.now(), data },
  });
  await updateBadge(settings, data);
  await maybeAlertRain(settings, data);
}

async function updateBadge(settings, data) {
  if (!settings.badge) {
    await chrome.action.setBadgeText({ text: '' });
    return;
  }
  await chrome.action.setBadgeBackgroundColor({ color: '#1f6fb4' });
  if (chrome.action.setBadgeTextColor) {
    await chrome.action.setBadgeTextColor({ color: '#ffffff' });
  }
  await chrome.action.setBadgeText({ text: formatTemp(data.current.temperature_2m) });
  await chrome.action.setTitle({
    title: `${settings.city || 'Hawa'}: ${formatTemp(data.current.temperature_2m)}, ${weatherText(data.current.weather_code)}`,
  });
}

async function maybeAlertRain(settings, data) {
  if (!settings.rainAlerts) return;
  const minutes = minutesUntilRain(data);
  if (minutes == null) return;

  const { lastRainAlertAt = 0 } = await chrome.storage.local.get('lastRainAlertAt');
  if (Date.now() - lastRainAlertAt < RAIN_ALERT_COOLDOWN_MS) return;

  await chrome.storage.local.set({ lastRainAlertAt: Date.now() });
  await chrome.notifications.create('rain-alert', {
    type: 'basic',
    iconUrl: 'icons/icon128.png',
    title: 'Hawa',
    message: `Rain expected in about ${minutes} minutes${settings.city ? ` in ${settings.city}` : ''}.`,
    priority: 1,
  });
}

/* ───────── Offscreen Geolocation ───────── */
// The service worker has no navigator.geolocation, so an offscreen document asks for it.
const OFFSCREEN_PATH = 'offscreen.html';

async function ensureOffscreenDocument() {
  const contexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [chrome.runtime.getURL(OFFSCREEN_PATH)],
  });
  if (contexts.length > 0) return;

  await chrome.offscreen.createDocument({
    url: OFFSCREEN_PATH,
    reasons: ['GEOLOCATION'],
    justification: 'Reading your location to show the local weather',
  });
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type !== 'request-location') return;

  (async () => {
    try {
      await ensureOffscreenDocument();
      const response = await chrome.runtime.sendMessage({ type: 'get-location' });
      sendResponse(response);
    } catch (err) {
      sendResponse({ error: -1, message: err.message });
    }
  })();

  return true;
});
