import type { ConfigType } from '@moneko/core';

const conf: Partial<ConfigType> = {
  output: {
    crossOriginLoading: false,
  },
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
  },
  fallbackCompPath: '@/components/fallback',
  reactCompiler: { compilationMode: 'annotation', target: '19' },
};

export default conf;
