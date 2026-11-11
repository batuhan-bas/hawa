# Hawa - Weather

<p align="center">
  <img src="icons/icon128.png" alt="Hawa Icon" width="128" height="128">
</p>

<p align="center">
  A minimal browser extension that shows the real weather for your location, with the temperature right on the toolbar.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Chrome-Manifest%20V3-4285F4?logo=googlechrome&logoColor=white" alt="Chrome">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
</p>

Hawa is the sister extension of [Vaqt](https://github.com/batuhan-bas/vaqt). Same look, same idea: open it, see what you need, close it. Free, no account, no API key.

## Features

- **Now** — temperature, feels like, today's high and low, humidity, wind, chance of rain and air quality
- **Next 24 hours** — hourly temperature, conditions and chance of rain
- **7 days** — daily low and high on one scale, so a cold day stands out
- **Temperature on the toolbar** — refreshed every 30 minutes, without opening the popup
- **Rain alerts** — a notification when rain is expected within the hour
- **City search** — share your location or pick any city; times are that city's own local time
- **°C or °F**, **24 or 12 hour**
- **Opens instantly** — the last forecast is shown right away while a fresh one loads

## Settings

| Setting | Options | Default |
|---------|---------|---------|
| Location | Current location / a city you search for | Current location |
| Units | °C, km/h / °F, mph | °C, km/h |
| Time Format | 24 Hour / 12 Hour | 24 Hour |
| Temperature on toolbar | On / Off | On |
| Rain alerts | On / Off | On |

## Privacy

Hawa has no servers of its own and doesn't track anything. Your settings are stored locally in your browser. To get the weather, your coordinates (or the city you search for) are sent to [Open-Meteo](https://open-meteo.com/); to show your city name, your coordinates are sent to [OpenStreetMap Nominatim](https://nominatim.org/). See the [Privacy Policy](privacy.html).

## Development

No build step. To run it locally:

1. Open `chrome://extensions` and turn on **Developer mode**
2. Click **Load unpacked** and select this folder
3. After changing a file, click the reload icon on the Hawa card

## Credits

- Weather data by [Open-Meteo.com](https://open-meteo.com/) ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/))
- Place names © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright)
- Weather icons: [Meteocons](https://github.com/basmilius/weather-icons) by Bas Milius ([MIT](weather-icons/LICENSE))
- Typeface: [Barlow Condensed](https://github.com/jpt/barlow) by The Barlow Project Authors ([SIL OFL 1.1](fonts/OFL.txt))

## License

[MIT](LICENSE)
