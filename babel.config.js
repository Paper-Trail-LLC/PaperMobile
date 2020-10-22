module.exports = {
  presets: ['babel-preset-expo'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
    // development: {
    //   plugins: ['transform-react-jsx-source']
    // }
  },
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    ['@babel/plugin-proposal-optional-catch-binding'],
    ['module-resolver',
      {
        alias: {
          'react-native-vector-icons': '@expo/vector-icons',
        },
      },
    ],
  ],
}
