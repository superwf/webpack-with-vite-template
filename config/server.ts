/// <reference path="../vendor.d.ts"/>
import chromePaths from 'chrome-paths'
import openBrowser = require('react-dev-utils/openBrowser')
import type { ProxyConfigMap } from 'webpack-dev-server'

export const proxyTarget = 'http://gateway.jd.com'

const PROXY_TARGET = 'http://gateway.jd.com'

export const devServer = {
  port: 3000,
  https: false,
  host: '0.0.0.0',
  after: () => {
    process.env.BROWSER = chromePaths.chrome
    process.env.BROWSER_ARGS = '--incognito'
    openBrowser(`http://local.jd.com:${devServer.port}`)
  },
}

export const proxy: ProxyConfigMap = {
  '/api': {
    target: PROXY_TARGET,
    secure: false,
    changeOrigin: true,
    headers: {
      Origin: PROXY_TARGET,
    },
  },
  /** 其他需要代理的项目 */
}
