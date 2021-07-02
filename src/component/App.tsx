import type { FC } from 'react'
import { Card } from 'antd'

const red = { color: 'red' }
const green = { color: 'green' }

export const App: FC = () => (
  <Card>
    <h1>项目使用说明</h1>
    <h2>
      本项目<span style={red}>不</span>是
    </h2>
    <ul>
      <li>现成的脚手架</li>
      <li>完备的生产环境发布功能(无打包优化)</li>
      <li>
        大而全的工程配置，缺少不限于:
        <br />
        1.webpack的loader，仅配置了示例必需的
        <br />
        2.测试环境，为了简化配置删除了所有测试环境
        <br />
        3.路由配置
      </li>
    </ul>
    <h2>
      本项目<span style={green}>是</span>
    </h2>
    <ul>
      <li>在同一项目中可同时使用webpack && vite</li>
      <li>除非不支持，否则所有地方统一使用ts</li>
      <li>
        抽离了webpack 与 vite 的公用部分(config文件夹)
        <br />
        使其在开发与打包流程中表现一致
      </li>
      <li>webpack 5 的模块热加载配置示例(webpack 与 babel都要配置)</li>
      <li>统一的外部externals管理(webpack 与 vite 共用)</li>
      <li>
        基础的代码风格校验配置
        <br />
        (eslint && prettier，本来不想加，但编写示例代码时无校验太难受还是加上)
      </li>
      <li>webpack 与 vite 都添加开发时的ts类型校验</li>
    </ul>
  </Card>
)
