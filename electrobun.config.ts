import type { ElectrobunConfig } from 'electrobun';

import pkg from './package.json';

export default {
  app: {
    name: 'letora',
    identifier: 'letora.draylegend.dev',
    version: pkg.version,
  },
  build: {
    bun: {
      entrypoint: 'apps/desktop/src/index.ts',
    },
    copy: {
      'dist/apps/app/browser': 'views/mainview',
    },
    watchIgnore: ['dist/**'],
    mac: {
      bundleCEF: false,
    },
    linux: {
      bundleCEF: false,
    },
    win: {
      bundleCEF: false,
    },
  },
  release: {
    baseUrl: 'https://github.com/draylegend/letora/releases/latest/download',
  },
} satisfies ElectrobunConfig;
