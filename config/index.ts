import type { ConfigType } from '@moneko/core';

const conf: Partial<ConfigType> = {
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    meta: {
      CSP: {
        'http-equiv': 'Content-Security-Policy',
        content: "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      },
    },
    tags: [
      {
        tag: 'script',
        src: 'https://cdn.statically.io/gh/monako97/cdn/main/npm/n-code-live/1.3.1/umd/index.js',
      },
    ],
  },
  fallbackCompPath: '@/components/fallback',
  importOnDemand: {
    lodash: {
      transform: '${member}',
    },
    '@ant-design/icons': {
      transform: 'es/icons/${member}',
    },
    antd: {
      transform: 'es/${member}',
      memberTransformers: ['dashed_case'],
    },
  },
};

export default conf;
