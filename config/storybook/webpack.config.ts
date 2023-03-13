import path from 'path'
import webpack, { RuleSetRule } from 'webpack'
import { BuildCssLoader } from '../build/loaders/BuildCssLoader'
import { BuildPaths } from '../build/types/config'

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    entry: '',
    build: '',
    html: '',
    src: path.resolve(__dirname, '..', '..', 'src')
  }
  config.resolve?.modules?.push(paths.src)
  config.resolve?.extensions?.push('ts', 'tsx')

  if (config.module && config.module.rules) {
    config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
      if (/svg/.test(rule.test as string)) {
        return { ...rule, exclude: /\.svg$/i }
      }

      return rule
    })
  }
  config.module?.rules?.push({
    test: /\.svg$/,
    use: ['@svgr/webpack']
  })
  config.module?.rules?.push(BuildCssLoader(true))

  return config
}
