import type { ConfigType } from '@moneko/core';

const conf: Partial<ConfigType> = {
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
  },
  fallbackCompPath: '@/components/fallback',
  reactCompiler: { compilationMode: 'annotation', target: '19' },
  lazyCompilation: true,
};

export default conf;
