/* eslint-disable @typescript-eslint/no-var-requires */
const config = {
  presets: ['react-app'],
  plugins: [],
  // plugins: [
  //   [
  //     'module-resolver',
  //     {
  //       extensions: ['.js', '.jsx', '.ts', '.tsx', '.es', '.es6', '.mjs'],
  //     },
  //   ],
  // ],
}

const isEnvDevelopment = process.env.NODE_ENV === 'development'
if (isEnvDevelopment) {
  config.plugins.push('react-refresh/babel')
}

module.exports = config
