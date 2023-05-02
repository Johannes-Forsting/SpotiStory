module.exports = function(api) {
  api.cache(true);
  return {
  presets: ['module:metro-react-native-babel-preset', 'babel-preset-expo'],
  plugins: [
    [
      'babel-plugin-dotenv-import',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
  }
};
