importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

importScripts(
  "/precache-manifest.e2e04c547ff6665ebd5a894831e0c517.js"
);

workbox.core.setCacheNameDetails({prefix: "no-horario"});

//nwtworkfirst all routes
workbox.routing.registerRoute(
  new RegExp('/*'),
  workbox.strategies.networkFirst()
);

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
