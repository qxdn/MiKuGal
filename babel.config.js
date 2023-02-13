module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@src': './src',
          '@configs': './src/configs',
          '@screens': './src/screens',
          '@components': './src/components',
          '@services': './src/services',
          '@reducers': './src/reducers',
        },
      },
    ],
  ],
};
