import { type ConfigType, PACKAGENAME } from '@moneko/core';

const conf: Partial<ConfigType> = {
  devtool: false,
  htmlPluginOption: {
    publicPath: `/${PACKAGENAME}/`,
  },
  seo: {
    domain: 'monako97.github.io',
    jekyll: false,
  },
  basename: `/${PACKAGENAME}`,
  sourceMap: false,
  fixBrowserRouter: {
    pathSegmentsToKeep: 1,
    path: '404.html',
  },
};

export default conf;
