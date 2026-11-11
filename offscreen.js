// Offscreen document: reads geolocation on behalf of the service worker,
// which has no navigator.geolocation of its own.

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type !== 'get-location') return;

  navigator.geolocation.getCurrentPosition(
    (pos) => sendResponse({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
    (err) => sendResponse({ error: err.code }),
    { timeout: 10000, maximumAge: 300000 }
  );

  // Respond asynchronously.
  return true;
});
