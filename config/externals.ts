import type { HtmlWebpackInjectExternalsPlugin } from 'html-webpack-inject-externals-plugin'

type TNodeEnv = 'production' | 'development'

export const unpkgHost = 'http://unpkg.jd.com'

const NODE_ENV: TNodeEnv = (process.env.NODE_ENV as TNodeEnv) || 'development'
const isProd = NODE_ENV === 'production'

// 根据开发环境注入不同的cdn文件
export const externals = {
  'regenerator-runtime': 'regeneratorRuntime',
  react: 'React',
  'react-dom': 'ReactDOM',
  moment: 'moment',
  lodash: '_',
  antd: 'antd',
}

export const packages: ConstructorParameters<
  typeof HtmlWebpackInjectExternalsPlugin
>[0]['packages'] = [
  {
    name: 'regenerator-runtime',
    path: '/runtime.js',
  },
  {
    name: 'antd',
    path: '/dist/antd.min.css',
  },
  {
    name: 'react',
    path: `/umd/react.${isProd ? 'production.min' : 'development'}.js`,
  },
  {
    name: 'react-dom',
    path: `/umd/react-dom.${isProd ? 'production.min' : 'development'}.js`,
  },
  {
    name: 'moment',
    path: `/min/moment-with-locales${isProd ? '.min' : ''}.js`,
  },
  {
    name: 'antd',
    path: `/dist/antd-with-locales${isProd ? '.min' : ''}.js`,
  },
]
