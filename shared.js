// Shared by popup.js and background.js (loaded with importScripts there).

const FORECAST_API = 'https://api.open-meteo.com/v1/forecast';
const AIR_QUALITY_API = 'https://air-quality-api.open-meteo.com/v1/air-quality';
const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const REVERSE_GEOCODE_API = 'https://nominatim.openstreetmap.org/reverse';

const DEFAULT_SETTINGS = {
  lat: null,
  lng: null,
  city: null,
  // 'gps' follows the device, 'manual' keeps the city the user picked.
  locationSource: 'gps',
  unit: 'celsius',
  timeFormat: '24h',
  badge: true,
  rainAlerts: true,
};

async function loadSettings() {
  try {
    const { settings } = await chrome.storage.local.get('settings');
    return { ...DEFAULT_SETTINGS, ...(settings || {}) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

async function saveSettings(patch) {
  const updated = { ...(await loadSettings()), ...patch };
  await chrome.storage.local.set({ settings: updated });
  return updated;
}

// WMO weather codes, as Open-Meteo returns them, mapped to Meteocons.
const WEATHER_CODES = {
  0: { text: 'Clear sky', day: 'clear-day', night: 'clear-night' },
  1: { text: 'Mainly clear', day: 'clear-day', night: 'clear-night' },
  2: { text: 'Partly cloudy', day: 'partly-cloudy-day', night: 'partly-cloudy-night' },
  3: { text: 'Overcast', day: 'overcast-day', night: 'overcast-night' },
  45: { text: 'Fog', day: 'fog-day', night: 'fog-night' },
  48: { text: 'Rime fog', day: 'fog-day', night: 'fog-night' },
  51: { text: 'Light drizzle', day: 'drizzle', night: 'drizzle' },
  53: { text: 'Drizzle', day: 'drizzle', night: 'drizzle' },
  55: { text: 'Dense drizzle', day: 'drizzle', night: 'drizzle' },
  56: { text: 'Freezing drizzle', day: 'sleet', night: 'sleet' },
  57: { text: 'Freezing drizzle', day: 'sleet', night: 'sleet' },
  61: { text: 'Light rain', day: 'rain', night: 'rain' },
  63: { text: 'Rain', day: 'rain', night: 'rain' },
  65: { text: 'Heavy rain', day: 'rain', night: 'rain' },
  66: { text: 'Freezing rain', day: 'sleet', night: 'sleet' },
  67: { text: 'Freezing rain', day: 'sleet', night: 'sleet' },
  71: { text: 'Light snow', day: 'snow', night: 'snow' },
  73: { text: 'Snow', day: 'snow', night: 'snow' },
  75: { text: 'Heavy snow', day: 'snow', night: 'snow' },
  77: { text: 'Snow grains', day: 'snow', night: 'snow' },
  80: { text: 'Rain showers', day: 'partly-cloudy-day-rain', night: 'partly-cloudy-night-rain' },
  81: { text: 'Rain showers', day: 'partly-cloudy-day-rain', night: 'partly-cloudy-night-rain' },
  82: { text: 'Heavy showers', day: 'partly-cloudy-day-rain', night: 'partly-cloudy-night-rain' },
  85: { text: 'Snow showers', day: 'partly-cloudy-day-snow', night: 'partly-cloudy-night-snow' },
  86: { text: 'Snow showers', day: 'partly-cloudy-day-snow', night: 'partly-cloudy-night-snow' },
  95: { text: 'Thunderstorm', day: 'thunderstorms-day-rain', night: 'thunderstorms-night-rain' },
  96: { text: 'Thunderstorm, hail', day: 'thunderstorms-day-rain', night: 'thunderstorms-night-rain' },
  99: { text: 'Thunderstorm, hail', day: 'thunderstorms-day-rain', night: 'thunderstorms-night-rain' },
};

function weatherText(code) {
  return (WEATHER_CODES[code] || { text: 'Unknown' }).text;
}

// Board-width labels for the hourly and weekly rows.
const SHORT_TEXT = {
  0: 'Clear', 1: 'Clear', 2: 'Part cloud', 3: 'Cloudy', 45: 'Fog', 48: 'Fog',
  51: 'Drizzle', 53: 'Drizzle', 55: 'Drizzle', 56: 'Ice drizzle', 57: 'Ice drizzle',
  61: 'Light rain', 63: 'Rain', 65: 'Heavy rain', 66: 'Ice rain', 67: 'Ice rain',
  71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 77: 'Snow',
  80: 'Showers', 81: 'Showers', 82: 'Heavy showers', 85: 'Snow showers', 86: 'Snow showers',
  95: 'Storm', 96: 'Storm, hail', 99: 'Storm, hail',
};

function weatherShort(code) {
  return SHORT_TEXT[code] || 'Unknown';
}

// The board's lead line: the next change worth knowing about, and when.
// Rain within the hour comes from the 15-minute feed; later rain from the
// first hour in the next 48 with a 50%+ chance.
function nextChange(data) {
  const c = data.current;
  if (c.precipitation > 0) return { kind: 'rain', label: 'Raining', when: 'Now' };

  const minutes = minutesUntilRain(data);
  if (minutes != null) return { kind: 'rain', label: 'Rain', when: `In ${minutes} min` };

  const h = data.hourly;
  const thisHour = `${c.time.slice(0, 13)}:00`;
  const start = Math.max(0, h.time.indexOf(thisHour));
  const today = c.time.slice(0, 10);
  for (let i = start + 1; i < Math.min(start + 48, h.time.length); i++) {
    if ((h.precipitation_probability[i] ?? 0) >= 50) {
      const day = h.time[i].slice(0, 10);
      const dayLabel = day === today ? 'Today' : new Date(`${day}T00:00:00Z`).toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
      return { kind: 'rain', label: 'Rain', when: `${dayLabel} ${h.time[i].slice(11, 16)}`, iso: h.time[i] };
    }
  }
  return { kind: 'dry', label: 'No rain', when: 'Next 48 h' };
}

function weatherIcon(code, isDay) {
  const info = WEATHER_CODES[code];
  const name = info ? (isDay ? info.day : info.night) : 'not-available';
  return `weather-icons/${name}.svg`;
}

// Open-Meteo answers in the location's own time zone (timezone=auto),
// so every time string below is already that place's wall clock.
function forecastUrl(settings) {
  const params = new URLSearchParams({
    latitude: settings.lat,
    longitude: settings.lng,
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day,precipitation',
    hourly: 'temperature_2m,weather_code,precipitation_probability,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset',
    minutely_15: 'precipitation',
    forecast_minutely_15: '8',
    forecast_days: '7',
    timezone: 'auto',
  });
  if (settings.unit === 'fahrenheit') {
    params.set('temperature_unit', 'fahrenheit');
    params.set('wind_speed_unit', 'mph');
  }
  return `${FORECAST_API}?${params}`;
}

function airQualityUrl(settings) {
  const params = new URLSearchParams({ latitude: settings.lat, longitude: settings.lng, current: 'european_aqi' });
  return `${AIR_QUALITY_API}?${params}`;
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather service error (${res.status}). Please try again.`);
  return res.json();
}

async function fetchForecast(settings) {
  const data = await fetchJson(forecastUrl(settings));
  if (!data || !data.current || !data.hourly || !data.daily) {
    throw new Error('Unexpected response from the weather service.');
  }
  return data;
}

function formatTemp(value) {
  return `${Math.round(value)}°`;
}

// European AQI bands, as defined by the European Environment Agency.
function aqiLabel(aqi) {
  if (aqi == null) return null;
  if (aqi <= 20) return { text: 'Good', level: 1 };
  if (aqi <= 40) return { text: 'Fair', level: 2 };
  if (aqi <= 60) return { text: 'Moderate', level: 3 };
  if (aqi <= 80) return { text: 'Poor', level: 4 };
  if (aqi <= 100) return { text: 'Very poor', level: 5 };
  return { text: 'Extremely poor', level: 6 };
}

// Minutes until rain starts within the next hour, or null.
// Returns null if it is already raining: that is not news.
function minutesUntilRain(data) {
  const m = data.minutely_15;
  if (!m || !m.precipitation || data.current.precipitation > 0) return null;
  for (let i = 1; i <= 4 && i < m.precipitation.length; i++) {
    if (m.precipitation[i] >= 0.1) return i * 15;
  }
  return null;
}
