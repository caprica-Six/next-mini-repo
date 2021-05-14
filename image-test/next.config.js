const withPlugins = require('next-compose-plugins');
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa');
const optimizedImages = require('next-optimized-images');

//next.js configuration
const nextConfig = {
  env: {
    DummyAPI_KEY: process.env.DummyAPI_KEY,
  },
  images: {
    // domains: [
    //   'ichef.bbci.co.uk',
    //   'm.files.bbci.co.uk',
    //   'static01.nyt.com',
    //   'kubrick.htvapps.com',
    //   'www.telegraph.co.uk',
    //   'e3.365dm.com',
    //   'nintendolife.com',
    //   'dailymail.co.uk',
    //   'i.guim.co.uk',
    //   'www.rollingstone.com',
    //   'image.cnbcfm.com',
    //   'www.thesun.co.uk',
    //   'cdn.mos.cms.futurecdn.net',
    // ],
  },
};

const plugins = [
  [
    withPWA({
      pwa: {
        // disable PWA for console
        disable: process.env.NODE_ENV === 'development',
        register: true,
        scope: '/',
        sw: 'sw.js',
        dest: 'public',
        runtimeCaching,
      },
    }),
    {
      workboxOpts: {
        swDest: process.env.NEXT_EXPORT ? 'sw.js' : 'static/sw.js',
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'offlineCache',
              expiration: {
                maxEntries: 200,
              },
            },
          },
        ],
      },
      async rewrites() {
        return [
          {
            source: '/sw.js',
            destination: '/_next/static/sw.js',
          },
        ];
      },
    },
  ],
  [
    optimizedImages,
    {
      optimizeImages: false,
    },
  ],
];

module.exports = withPlugins(plugins, nextConfig);
