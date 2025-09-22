import { type ConfigType } from '@moneko/core';

const conf: Partial<ConfigType> = {
  output: {
    crossOriginLoading: false,
  },
  htmlPluginOption: {
    favicon: './site/assets/images/favicon.ico',
    tags: [
      {
        tag: 'script',
        src: 'https://cdn.statically.io/gh/monako97/cdn/main/npm/n-code-live/1.3.1/umd/index.js',
      },
    ],
  },
  fallbackCompPath: '@/components/fallback',
  reactCompiler: { compilationMode: 'annotation', target: '19' },
  // reactJsxRuntime: isDev ? 'classic' : 'automatic',
  // moduleFederation: [
  //   {
  //     name: 'custom_form_ant',
  //     // 接入 moduleFederation
  //     remotes: [
  //       {
  //         name: 'demo_module_federation',
  //         host: 'https://monako97.github.io/demo-module-federation',
  //         library: [
  //           'react',
  //           'react/jsx-runtime',
  //           'react-dom',
  //           'react-dom/client',
  //           'react-router',
  //           'react-router-dom',
  //           'dayjs',
  //         ],
  //       },
  //     ],
  //   },
  // ],
};

export default conf;
