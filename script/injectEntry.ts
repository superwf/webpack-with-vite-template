/* eslint-disable global-require,no-empty,import/no-dynamic-require,@typescript-eslint/no-var-requires */
import { load } from 'cheerio'

import { packages, unpkgHost } from '../config/externals'

/** 将externals依赖文件与入口文件注入body */
export const injectEntry = (html: string) => {
  const $ = load(html)

  const head = $('head')

  ;[...packages].reverse().forEach((pkg) => {
    const tag = (pkg.path || pkg.fullPath || '').endsWith('.js')
      ? 'script'
      : 'link'
    let pathname = ''
    if (pkg.fullPath) {
      pathname = pkg.fullPath
    } else {
      try {
        const { version } = require(`${pkg.name}/package.json`)
        if (version) {
          pathname = `${unpkgHost}/${pkg.name}@${version}${pkg.path}`
        }
      } catch (e) {}
    }
    const node =
      tag === 'script'
        ? `<script src="${pathname}"></script>`
        : `<link href="${pathname}" rel="stylesheet" />`
    head.prepend(node)
  })
  return $.html()
}
