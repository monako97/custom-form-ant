import { type ConfigType, PACKAGENAME } from '@moneko/core';

const conf: Partial<ConfigType> = {
  devtool: false,
  seo: {
    domain: 'monako97.github.io',
    jekyll: false,
  },
  basename: `/${PACKAGENAME}`,
  publicPath: `/${PACKAGENAME}/`,
  sourceMap: false,
  fixBrowserRouter: {
    pathSegmentsToKeep: 1,
    path: '404.html',
  },
};

export default conf;
