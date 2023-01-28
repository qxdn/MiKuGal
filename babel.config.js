module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@configs': './src/configs',
          '@screens': './src/screens',
          '@components': './src/components',
        },
      },
    ],
  ],
};
