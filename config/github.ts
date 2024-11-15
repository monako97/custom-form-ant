import { type ConfigType, PACKAGENAME } from '@moneko/core';

const conf: Partial<ConfigType> = {
  devtool: false,
  seo: {
    domain: 'monako97.github.io',
    jekyll: false,
  },
  basename: `/${PACKAGENAME}`,
  sourceMap: false,
  publicPath: `/${PACKAGENAME}/`,
  fixBrowserRouter: {
    pathSegmentsToKeep: 1,
    path: '404.html',
  },
  moduleFederation: [
    {
      name: 'custom_form_ant',
      // 接入 moduleFederation
      remotes: [
        {
          name: 'demo_module_federation',
          host: 'https://monako97.github.io/demo-module-federation',
          library: [
            'react',
            'react/jsx-runtime',
            'react-dom',
            'react-dom/client',
            'react-router',
            'react-router-dom',
            'dayjs',
          ],
        },
      ],
    },
  ],
};

export default conf;
