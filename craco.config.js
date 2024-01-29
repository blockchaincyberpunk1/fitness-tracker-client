const CracoLessPlugin = require('craco-less');

const cracoConfig = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#37B5B6' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

module.exports = cracoConfig;
