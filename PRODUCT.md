# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People at a computer who want the weather in a few seconds between tasks. Most of the time they only glance at the temperature on the browser toolbar; they open the popup before going out, to see whether it will rain and how the day and week look.

## Product Purpose

Hawa is a free Chrome extension (Manifest V3) that shows the real weather for the user's location, or for a city they pick. Success means the answer to "do I need a jacket or an umbrella?" is visible within one glance at the popup, and the toolbar temperature is right without opening it.

## Positioning

Free, no account, no API key, no servers of its own and no tracking. The temperature lives on the toolbar icon and a rain alert arrives before the rain, so the user rarely needs to open anything. Named with an Arabic word (hawa, "air"), like its sister extension Vaqt, but Hawa has its own identity; only the naming and the free, private stance connect the two.

## Operating Context

A browser toolbar popup: 360px wide, Chrome caps its height at 600px, opened and closed in seconds, often several times a day. The toolbar badge is the most-seen surface. Notifications arrive while the user works in other tabs.

## Capabilities and Constraints

- Now: temperature, condition, feels like, today's high and low, humidity, wind, chance of rain today, European air quality index
- Next 24 hours: hourly temperature, condition and chance of rain
- 7 days: daily low and high, condition, chance of rain
- Toolbar temperature badge, refreshed every 30 minutes (can be turned off)
- Rain alert notification when rain is expected within the hour, at most once per 3 hours (can be turned off)
- Location by GPS or city search; manual city is never overwritten by GPS
- Units °C/km/h or °F/mph; 24 or 12 hour clock
- Data: Open-Meteo forecast, air quality and geocoding; OpenStreetMap Nominatim for the GPS city name. Attribution to Open-Meteo (CC BY 4.0), OpenStreetMap and Meteocons is required
- Plain HTML/CSS/JS, no build step; CSP `script-src 'self'` (no inline scripts, no remote code)
- All times shown are the selected location's own local time

## Brand Commitments

- Name: Hawa
- Weather icons: Meteocons by Bas Milius (animated SVG, MIT), bundled in `weather-icons/`; must be kept
- All current features must be kept
- Independent visual identity from Vaqt (confirmed 2026-11-11)

## Evidence on Hand

- Real live data from Open-Meteo for any city; no testimonials, user counts or reviews exist yet and none may be invented
- Extension icon: `icons/icon128.png`

## Product Principles

1. One glance answers the question: the most decision-relevant fact (now, and rain) comes first.
2. The toolbar does most of the work; the popup is for the next decision, not exploration.
3. Private by default: nothing leaves the browser except the request needed to answer.
4. Never wrong about time: every time shown is the place's own local time.
