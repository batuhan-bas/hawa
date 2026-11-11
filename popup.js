/* ───────── DOM Refs ───────── */
const $ = (id) => document.getElementById(id);
const $loading = $('loading');
const $permission = $('permission');
const $main = $('main');
const $settings = $('settings');
const $error = $('error');
const $errorMessage = $('error-message');
const $cityName = $('city-name');
const $localTime = $('local-time');
const $currentLocation = $('current-location');
const $settingsCitySearch = $('settings-city-search');

let current = null; // { data, aqi } last rendered

/* ───────── Screens ───────── */
function showScreen(screen) {
  [$loading, $permission, $main, $settings, $error].forEach((s) => s.classList.add('hidden'));
  screen.classList.remove('hidden');
}

function showError(message) {
  $errorMessage.textContent = message;
  showScreen($error);
}

// The board sets names in caps. Turkish and Azerbaijani need their own casing
// rules (i → İ, ı → I), which CSS text-transform applies from the lang attribute.
// Only for names spelled natively (they carry a Turkish letter). The geocoder
// also returns English exonyms ("Izmir", "Boz Mountains") whose capital I is
// English; Turkish casing on those would print a mixed "IZMİR".
function placeLang(countryCode, name = '') {
  const lang = { TR: 'tr', AZ: 'az' }[String(countryCode || '').toUpperCase()];
  return lang && /[çğıöşüəÇĞİÖŞÜƏ]/.test(name) ? lang : 'en';
}

function setCity(name, countryCode) {
  for (const node of [$cityName, $currentLocation]) {
    node.textContent = name || 'Your location';
    node.lang = placeLang(countryCode, name || "");
  }
}

/* ───────── Location ───────── */
async function getLocation() {
  const response = await chrome.runtime.sendMessage({ type: 'request-location' });
  if (response && response.lat !== undefined && response.lng !== undefined) {
    return { lat: response.lat, lng: response.lng };
  }
  const messages = {
    1: 'Location permission denied. Allow it in your browser settings, or search for a city.',
    2: 'Unable to determine your location.',
    3: 'Location request timed out.',
  };
  throw new Error(messages[response && response.error] || 'Unable to get your location.');
}

// One request per location change, which the Nominatim usage policy allows.
async function reverseGeocode(lat, lng) {
  try {
    const params = new URLSearchParams({ lat, lon: lng, format: 'json', zoom: '10', 'accept-language': 'en' });
    const res = await fetch(`${REVERSE_GEOCODE_API}?${params}`);
    if (!res.ok) return null;
    const data = await res.json();
    const a = data.address || {};
    return { name: a.city || a.town || a.village || a.county || a.state || null, countryCode: a.country_code || null };
  } catch {
    return { name: null, countryCode: null };
  }
}

async function useDeviceLocation(known = null) {
  const loc = known || (await getLocation());
  const place = await reverseGeocode(loc.lat, loc.lng);
  const settings = await saveSettings({
    lat: loc.lat, lng: loc.lng, city: place.name, countryCode: place.countryCode, locationSource: 'gps',
  });
  setCity(place.name, place.countryCode);
  return settings;
}

/* ───────── City Search ───────── */
async function searchCities(query) {
  const params = new URLSearchParams({ name: query, count: '5', language: 'en', format: 'json' });
  try {
    const res = await fetch(`${GEOCODING_API}?${params}`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).map((r) => ({
      name: r.name,
      detail: [r.admin1, r.country].filter(Boolean).join(', '),
      lat: r.latitude,
      lng: r.longitude,
      countryCode: r.country_code || null,
    }));
  } catch {
    return [];
  }
}

function showSearchMessage(container, text) {
  const msg = document.createElement('div');
  msg.className = 'city-searching';
  msg.textContent = text;
  container.replaceChildren(msg);
}

// Place names come from a third-party API, so they are set with textContent.
function renderCityResults(container, cities, onPick) {
  const items = cities.map((city) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'city-result-item';
    const name = document.createElement('div');
    name.className = 'city-result-name';
    name.textContent = city.name;
    name.lang = placeLang(city.countryCode, city.name);
    const detail = document.createElement('div');
    detail.className = 'city-result-detail';
    detail.textContent = city.detail;
    btn.append(name, detail);
    btn.addEventListener('click', () => onPick(city));
    return btn;
  });
  container.replaceChildren(...items);
}

function setupCitySearch(input, results, onSelect) {
  let timer = null;
  let seq = 0;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    const query = input.value.trim();
    if (query.length < 2) {
      results.classList.add('hidden');
      return;
    }
    timer = setTimeout(async () => {
      const mine = ++seq;
      showSearchMessage(results, 'Searching...');
      results.classList.remove('hidden');
      const cities = await searchCities(query);
      if (mine !== seq) return; // a newer search is on its way
      if (cities.length === 0) {
        showSearchMessage(results, 'No results found');
        return;
      }
      renderCityResults(results, cities, (city) => {
        input.value = '';
        results.classList.add('hidden');
        onSelect(city);
      });
    }, 350);
  });
}

async function selectCity(city) {
  showScreen($loading);
  try {
    const settings = await saveSettings({
      lat: city.lat, lng: city.lng, city: city.name, countryCode: city.countryCode, locationSource: 'manual',
    });
    setCity(city.name, city.countryCode);
    await loadWeather(settings);
    showScreen($main);
  } catch (err) {
    showError(err.message);
  }
}

/* ───────── Formatting ───────── */
function formatClock(isoLocal, format) {
  const [h, m] = isoLocal.slice(11, 16).split(':').map(Number);
  if (format === '24h') return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  const period = h >= 12 ? 'PM' : 'AM';
  return `${h % 12 || 12}${m ? ':' + String(m).padStart(2, '0') : ''} ${period}`;
}

function formatHour(isoLocal, format) {
  const h = Number(isoLocal.slice(11, 13));
  if (format === '24h') return `${String(h).padStart(2, '0')}:00`;
  return `${h % 12 || 12} ${h >= 12 ? 'PM' : 'AM'}`;
}

// Dates are the location's calendar days; read them as UTC so the weekday never shifts.
function weekday(isoDate) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function iconImg(code, isDay, className) {
  const img = el('img', className);
  img.src = weatherIcon(code, isDay);
  img.alt = weatherText(code);
  return img;
}

/* ───────── Flaps ───────── */
// Sets text as split-flap cells. Only characters that actually change flip,
// left to right, so a refresh with the same data stays still.
function setFlaps(node, text) {
  const chars = [...String(text)];
  const old = [...node.children].map((c) => c.textContent);
  const cells = chars.map((ch, i) => {
    const cell = el('span', ch === ' ' ? 'f space' : ch === '°' ? 'f deg' : 'f', ch);
    if (old.length && old[i] !== ch) {
      cell.classList.add('flip');
      cell.style.animationDelay = `${i * 45}ms`;
    }
    return cell;
  });
  node.replaceChildren(...cells);
  node.setAttribute('aria-label', text);
}

/* ───────── Render ───────── */
function render(data, aqi, settings) {
  const c = data.current;
  const d = data.daily;
  const windUnit = settings.unit === 'fahrenheit' ? 'mph' : 'km/h';

  $localTime.textContent = formatClock(c.time, settings.timeFormat);
  // The sky follows the place: day blue while the sun is up there, night navy after.
  document.body.classList.toggle('night', !c.is_day);
  $('now-icon').src = weatherIcon(c.weather_code, c.is_day);
  setFlaps($('now-temp'), formatTemp(c.temperature_2m));
  $('now-text').textContent = weatherText(c.weather_code);
  $('now-feels').textContent = formatTemp(c.apparent_temperature);
  $('now-high').textContent = formatTemp(d.temperature_2m_max[0]);
  $('now-low').textContent = formatTemp(d.temperature_2m_min[0]);

  $('stat-humidity').textContent = `${Math.round(c.relative_humidity_2m)}%`;
  $('stat-wind').textContent = `${Math.round(c.wind_speed_10m)} ${windUnit}`;
  $('stat-rain').textContent = d.precipitation_probability_max[0] == null ? '--' : `${d.precipitation_probability_max[0]}%`;
  const label = aqiLabel(aqi);
  $('stat-aqi').textContent = label ? label.text : '--';
  $('aqi-dot').className = `aqi-mark${label ? ` aqi-${label.level}` : ''}`;
  $('aqi-dot').title = aqi == null ? '' : `European AQI ${aqi}`;

  renderLead(data, settings);
  renderHourly(data, settings);
  renderDaily(data, settings);
}

function renderLead(data, settings) {
  const next = nextChange(data);
  let when = next.when;
  // Later rain carries its hour; show it in the user's clock format.
  if (next.iso) when = `${next.when.split(' ')[0]} ${formatHour(next.iso, settings.timeFormat)}`;
  setFlaps($('lead-label'), next.label);
  setFlaps($('lead-when'), when);
}

function rainCell(pop) {
  return el('span', `num t-rain${pop >= 30 ? ' wet' : ''}`, pop == null ? '--' : `${pop}%`);
}

function skyCell(code, isDay) {
  const cell = el('span', 'sky');
  const img = iconImg(code, isDay);
  img.alt = ''; // the label beside it already says it
  cell.append(img, el('span', null, weatherShort(code)));
  return cell;
}

function renderHourly(data, settings) {
  const h = data.hourly;
  const thisHour = `${data.current.time.slice(0, 13)}:00`;
  const start = Math.max(0, h.time.indexOf(thisHour));

  const rows = [];
  const c = data.current;
  for (let i = start; i < Math.min(start + 24, h.time.length); i++) {
    // The Now row shows the same reading as the big temperature, not the hour's forecast.
    const isNow = i === start;
    const row = el('div', 'hour');
    row.setAttribute('role', 'row');
    row.append(
      el('span', 't-time', isNow ? 'Now' : formatHour(h.time[i], settings.timeFormat)),
      isNow ? skyCell(c.weather_code, c.is_day) : skyCell(h.weather_code[i], h.is_day[i]),
      el('span', 'num', formatTemp(isNow ? c.temperature_2m : h.temperature_2m[i])),
      rainCell(h.precipitation_probability[i])
    );
    rows.push(row);
  }
  $('hourly').replaceChildren(...rows);
}

function renderDaily(data) {
  const d = data.daily;
  const rows = d.time.map((date, i) => {
    const row = el('div', 'day');
    row.setAttribute('role', 'row');
    row.append(
      el('span', 't-time', i === 0 ? 'Today' : weekday(date)),
      skyCell(d.weather_code[i], 1),
      rainCell(d.precipitation_probability_max[i]),
      el('span', 'num t-low', formatTemp(d.temperature_2m_min[i])),
      el('span', 'num', formatTemp(d.temperature_2m_max[i]))
    );
    return row;
  });
  $('daily').replaceChildren(...rows);
}

/* ───────── Data ───────── */
async function fetchAqi(settings) {
  try {
    const data = await fetchJson(airQualityUrl(settings));
    return data.current ? data.current.european_aqi : null;
  } catch {
    return null; // Air quality is a nice-to-have; never block the forecast on it.
  }
}

async function loadWeather(settings) {
  const [data, aqi] = await Promise.all([fetchForecast(settings), fetchAqi(settings)]);
  current = { data, aqi };
  render(data, aqi, settings);
  await chrome.storage.local.set({
    cache: { lat: settings.lat, lng: settings.lng, unit: settings.unit, fetchedAt: Date.now(), data, aqi },
  });
}

async function cachedFor(settings) {
  const { cache } = await chrome.storage.local.get('cache');
  if (!cache || cache.lat !== settings.lat || cache.lng !== settings.lng || cache.unit !== settings.unit) return null;
  return cache;
}

/* ───────── Settings UI ───────── */
function syncToggles(settings) {
  const pairs = [
    ['data-unit', settings.unit],
    ['data-format', settings.timeFormat],
    ['data-badge', settings.badge ? 'on' : 'off'],
    ['data-rain', settings.rainAlerts ? 'on' : 'off'],
  ];
  for (const [attr, value] of pairs) {
    document.querySelectorAll(`[${attr}]`).forEach((btn) => {
      const active = btn.getAttribute(attr) === value;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }
}

function bindToggle(attr, toPatch, rerender) {
  document.querySelectorAll(`[${attr}]`).forEach((btn) => {
    btn.addEventListener('click', async () => {
      const settings = await saveSettings(toPatch(btn.getAttribute(attr)));
      syncToggles(settings);
      if (rerender) await rerender(settings);
    });
  });
}

bindToggle('data-unit', (v) => ({ unit: v }), async (settings) => {
  try {
    await loadWeather(settings);
  } catch (err) {
    showError(err.message);
  }
});
bindToggle('data-format', (v) => ({ timeFormat: v }), async (settings) => {
  if (current) render(current.data, current.aqi, settings);
});
bindToggle('data-badge', (v) => ({ badge: v === 'on' }));
bindToggle('data-rain', (v) => ({ rainAlerts: v === 'on' }));

$('settings-btn').addEventListener('click', () => showScreen($settings));
$('back-btn').addEventListener('click', () => showScreen($main));
$('retry-btn').addEventListener('click', () => init());
$('grant-btn').addEventListener('click', async () => {
  showScreen($loading);
  try {
    const settings = await useDeviceLocation();
    await loadWeather(settings);
    showScreen($main);
  } catch (err) {
    showError(err.message);
  }
});

$('change-location-btn').addEventListener('click', () => {
  $settingsCitySearch.classList.toggle('hidden');
  if (!$settingsCitySearch.classList.contains('hidden')) $('settings-city-input').focus();
});

$('use-location-btn').addEventListener('click', async () => {
  showScreen($loading);
  try {
    const settings = await useDeviceLocation();
    await loadWeather(settings);
    $settingsCitySearch.classList.add('hidden');
    showScreen($settings);
  } catch (err) {
    showError(err.message);
  }
});

setupCitySearch($('city-search'), $('city-results'), selectCity);
setupCitySearch($('settings-city-input'), $('settings-city-results'), async (city) => {
  await selectCity(city);
  $settingsCitySearch.classList.add('hidden');
  showScreen($settings);
});

/* ───────── Main Flow ───────── */
async function init() {
  showScreen($loading);
  const settings = await loadSettings();
  syncToggles(settings);

  if (settings.lat == null || settings.lng == null) {
    try {
      const updated = await useDeviceLocation();
      await loadWeather(updated);
      showScreen($main);
    } catch {
      showScreen($permission);
    }
    return;
  }

  setCity(settings.city, settings.countryCode);

  // Show the last known weather at once, then refresh it.
  const cache = await cachedFor(settings);
  if (cache) {
    current = { data: cache.data, aqi: cache.aqi ?? null };
    render(cache.data, current.aqi, settings);
    showScreen($main);
  }

  try {
    await loadWeather(settings);
    showScreen($main);
  } catch (err) {
    if (!cache) showError(err.message);
  }

  // Follow the device only if the user hasn't picked a city by hand.
  // Only when the device has really moved (about 5 km), so small GPS jitter
  // doesn't cost a new place-name lookup on every open.
  if (settings.locationSource !== 'manual') {
    getLocation()
      .then(async (loc) => {
        if (Math.abs(loc.lat - settings.lat) < 0.05 && Math.abs(loc.lng - settings.lng) < 0.05) return;
        await loadWeather(await useDeviceLocation(loc));
      })
      .catch(() => {});
  }
}

init();
