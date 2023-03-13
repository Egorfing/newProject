import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import Webpack from 'webpack'
import { BuildCssLoader } from './loaders/BuildCssLoader'
import { BuildOptions } from './types/config'

export function buildLoaders({ isDev }: BuildOptions): Webpack.RuleSetRule[] {
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/
  }

  const svgLouder = {
    test: /\.svg$/,
    use: ['@svgr/webpack']
  }

  const fileLouder = {
    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
    use: [
      {
        loader: 'file-loader'
      }
    ]
  }
  const cssLoader = BuildCssLoader(isDev)
  
  return [fileLouder, svgLouder, typescriptLoader, cssLoader]
}
