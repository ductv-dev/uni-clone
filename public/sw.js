if (!self.define) {
  let e,
    a = {}
  const s = (s, n) => (
    (s = new URL(s + ".js", n).href),
    a[s] ||
      new Promise((a) => {
        if ("document" in self) {
          const e = document.createElement("script")
          ;((e.src = s), (e.onload = a), document.head.appendChild(e))
        } else ((e = s), importScripts(s), a())
      }).then(() => {
        let e = a[s]
        if (!e) throw new Error(`Module ${s} didn’t register its module`)
        return e
      })
  )
  self.define = (n, c) => {
    const t =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href
    if (a[t]) return
    let i = {}
    const r = (e) => s(e, t),
      f = { module: { uri: t }, exports: i, require: r }
    a[t] = Promise.all(n.map((e) => f[e] || r(e))).then((e) => (c(...e), i))
  }
}
define(["./workbox-3c9d0171"], function (e) {
  "use strict"
  ;(importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/chunks/0cfade9a-546cfd5afb84543d.js",
          revision: "546cfd5afb84543d",
        },
        {
          url: "/_next/static/chunks/100-1dce3cc650d355e0.js",
          revision: "1dce3cc650d355e0",
        },
        {
          url: "/_next/static/chunks/11-2d1efe9b59b71d21.js",
          revision: "2d1efe9b59b71d21",
        },
        {
          url: "/_next/static/chunks/124-5a86330b49c71623.js",
          revision: "5a86330b49c71623",
        },
        {
          url: "/_next/static/chunks/2-18a1aeceab45ec57.js",
          revision: "18a1aeceab45ec57",
        },
        {
          url: "/_next/static/chunks/216-a8bd577b343dbdef.js",
          revision: "a8bd577b343dbdef",
        },
        {
          url: "/_next/static/chunks/475-3bd80d6ded145ec2.js",
          revision: "3bd80d6ded145ec2",
        },
        {
          url: "/_next/static/chunks/648-9d901fa77e520916.js",
          revision: "9d901fa77e520916",
        },
        {
          url: "/_next/static/chunks/667-a889cc89580652fd.js",
          revision: "a889cc89580652fd",
        },
        {
          url: "/_next/static/chunks/728-8f9f5bd88d3286f0.js",
          revision: "8f9f5bd88d3286f0",
        },
        {
          url: "/_next/static/chunks/772-a4fafcaa4613323e.js",
          revision: "a4fafcaa4613323e",
        },
        {
          url: "/_next/static/chunks/799-1d023da817d70c06.js",
          revision: "1d023da817d70c06",
        },
        {
          url: "/_next/static/chunks/815-d344ce72899233ed.js",
          revision: "d344ce72899233ed",
        },
        {
          url: "/_next/static/chunks/829-4075b41990f5d263.js",
          revision: "4075b41990f5d263",
        },
        {
          url: "/_next/static/chunks/app/(auth)/layout-11aface4a58fbb24.js",
          revision: "11aface4a58fbb24",
        },
        {
          url: "/_next/static/chunks/app/(auth)/login/page-b524efd921362372.js",
          revision: "b524efd921362372",
        },
        {
          url: "/_next/static/chunks/app/(auth)/register/page-a2b635a6b6c875fd.js",
          revision: "a2b635a6b6c875fd",
        },
        {
          url: "/_next/static/chunks/app/_global-error/page-11aface4a58fbb24.js",
          revision: "11aface4a58fbb24",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-a14772852075b538.js",
          revision: "a14772852075b538",
        },
        {
          url: "/_next/static/chunks/app/add-wallet/page-f6dc764b85ca7a38.js",
          revision: "f6dc764b85ca7a38",
        },
        {
          url: "/_next/static/chunks/app/create-wallet/page-1329926db9d22c22.js",
          revision: "1329926db9d22c22",
        },
        {
          url: "/_next/static/chunks/app/layout-1840fe87ddb30f15.js",
          revision: "1840fe87ddb30f15",
        },
        {
          url: "/_next/static/chunks/app/manifest.webmanifest/route-11aface4a58fbb24.js",
          revision: "11aface4a58fbb24",
        },
        {
          url: "/_next/static/chunks/app/page-11aface4a58fbb24.js",
          revision: "11aface4a58fbb24",
        },
        {
          url: "/_next/static/chunks/app/user/token/%5Bid%5D/page-625f7d6506782e86.js",
          revision: "625f7d6506782e86",
        },
        {
          url: "/_next/static/chunks/app/user/account/page-76f6ba2cf472f29c.js",
          revision: "76f6ba2cf472f29c",
        },
        {
          url: "/_next/static/chunks/app/user/history/page-43ba61db242d7fce.js",
          revision: "43ba61db242d7fce",
        },
        {
          url: "/_next/static/chunks/app/user/home/page-22cb63cf9e132ee5.js",
          revision: "22cb63cf9e132ee5",
        },
        {
          url: "/_next/static/chunks/app/user/layout-4ed9e50be45a25cd.js",
          revision: "4ed9e50be45a25cd",
        },
        {
          url: "/_next/static/chunks/app/user/my-wallet/page-11aface4a58fbb24.js",
          revision: "11aface4a58fbb24",
        },
        {
          url: "/_next/static/chunks/app/user/search/page-a0f980cbc1856a2c.js",
          revision: "a0f980cbc1856a2c",
        },
        {
          url: "/_next/static/chunks/app/user/setting/page-abb7c2eaf66a1dda.js",
          revision: "abb7c2eaf66a1dda",
        },
        {
          url: "/_next/static/chunks/app/wellcome/page-d4e5f9344d3fb17e.js",
          revision: "d4e5f9344d3fb17e",
        },
        {
          url: "/_next/static/chunks/d3192d86-774f0f56adc5178e.js",
          revision: "774f0f56adc5178e",
        },
        {
          url: "/_next/static/chunks/framework-19545d7140ff7005.js",
          revision: "19545d7140ff7005",
        },
        {
          url: "/_next/static/chunks/main-9223e58304f29032.js",
          revision: "9223e58304f29032",
        },
        {
          url: "/_next/static/chunks/main-app-9401bce4c7f0bfbb.js",
          revision: "9401bce4c7f0bfbb",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/app-error-11aface4a58fbb24.js",
          revision: "11aface4a58fbb24",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/forbidden-11aface4a58fbb24.js",
          revision: "11aface4a58fbb24",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/global-error-c6af7ba16be172a4.js",
          revision: "c6af7ba16be172a4",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/not-found-11aface4a58fbb24.js",
          revision: "11aface4a58fbb24",
        },
        {
          url: "/_next/static/chunks/next/dist/client/components/builtin/unauthorized-11aface4a58fbb24.js",
          revision: "11aface4a58fbb24",
        },
        {
          url: "/_next/static/chunks/polyfills-42372ed130431b0a.js",
          revision: "846118c33b2c0e922d7b3a7676f81f6f",
        },
        {
          url: "/_next/static/chunks/webpack-472a94e676e23b62.js",
          revision: "472a94e676e23b62",
        },
        {
          url: "/_next/static/css/adb31ec61dc850d9.css",
          revision: "adb31ec61dc850d9",
        },
        {
          url: "/_next/static/m_AL3yLES5EQnHj6Ns9-Y/_buildManifest.js",
          revision: "d822d3c72a29a3ee39d0c2e430bf3aee",
        },
        {
          url: "/_next/static/m_AL3yLES5EQnHj6Ns9-Y/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/media/4cf2300e9c8272f7-s.p.woff2",
          revision: "18bae71b1e1b2bb25321090a3b563103",
        },
        {
          url: "/_next/static/media/747892c23ea88013-s.woff2",
          revision: "a0761690ccf4441ace5cec893b82d4ab",
        },
        {
          url: "/_next/static/media/8d697b304b401681-s.woff2",
          revision: "cc728f6c0adb04da0dfcb0fc436a8ae5",
        },
        {
          url: "/_next/static/media/93f479601ee12b01-s.p.woff2",
          revision: "da83d5f06d825c5ae65b7cca706cb312",
        },
        {
          url: "/_next/static/media/9610d9e46709d722-s.woff2",
          revision: "7b7c0ef93df188a852344fc272fc096b",
        },
        {
          url: "/_next/static/media/ba015fad6dcf6784-s.woff2",
          revision: "8ea4f719af3312a055caf09f34c89a77",
        },
        {
          url: "/icons/apple-touch-icon.png",
          revision: "28f31f5da1124f7d1bb979b739fc560c",
        },
        {
          url: "/icons/icon-192x192.png",
          revision: "28f31f5da1124f7d1bb979b739fc560c",
        },
        {
          url: "/icons/icon-512x512.png",
          revision: "28f31f5da1124f7d1bb979b739fc560c",
        },
        { url: "/manifest.json", revision: "d10e119f0bf7b107dbb71d50f34c233f" },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ response: e }) =>
              e && "opaqueredirect" === e.type
                ? new Response(e.body, {
                    status: 200,
                    statusText: "OK",
                    headers: e.headers,
                  })
                : e,
          },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: "next-static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ sameOrigin: e, url: { pathname: a } }) =>
        !(!e || a.startsWith("/api/auth/callback") || !a.startsWith("/api/")),
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: a }, sameOrigin: s }) =>
        "1" === e.headers.get("RSC") &&
        "1" === e.headers.get("Next-Router-Prefetch") &&
        s &&
        !a.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc-prefetch",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: a }, sameOrigin: s }) =>
        "1" === e.headers.get("RSC") && s && !a.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: { pathname: e }, sameOrigin: a }) => a && !e.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ sameOrigin: e }) => !e,
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET"
    ))
})
