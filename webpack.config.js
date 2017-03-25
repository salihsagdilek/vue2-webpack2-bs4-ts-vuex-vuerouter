const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProd = process.env.mode === 'prod';

const commonCssOptions = {
  sassResources: [
    path.resolve(__dirname, 'src/styles/_variables.scss'),
    path.resolve(__dirname, 'src/styles/custom.scss'),
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 version', 'ie >= 10'],
    }),
  ],
  sass: {
    loaders: ['sass-loader', 'sass-resources-loader'],
  },
};

const config = {
  entry: ['bootstrap-loader/extractStyles', './src/app'],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [autoprefixer({
            browsers: ['last 2 version', 'ie >= 10'],
          })],
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      /*
       * Sass loader (required for Bootstrap 4)
       */
      {
        test: /\.css$/,
        use: ['raw-loader']
      },

      {
        test: /\.scss$/,
        use: ['raw-loader', 'sass-loader']
      },

      /*
       * Bootstrap 4 loader
       */
      {
        test: /bootstrap\/dist\/js\/umd\//,
        use: 'imports-loader?jQuery=jquery'
      },

      /*
       * Font loaders, required for font-awesome-sass-loader and bootstrap-loader
       */
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
    ]
  },
  devServer: {
    compress: true,
    open: true,
    historyApiFallback: true,
    stats: "errors-only"
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Tether: "tether",
      "window.Tether": "tether",
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
      Button: "exports-loader?Button!bootstrap/js/dist/button",
      Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
      Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
      Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
      Util: "exports-loader?Util!bootstrap/js/dist/util"
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: isProd,
      debug: !isProd,
      options: commonCssOptions,
    }),
    new ExtractTextPlugin({filename: '[name].bundle.css', disable: false, allChunks: true}),
    new HtmlWebpackPlugin({
      title: 'TodoApp',
      template: './src/templates/index.html',
      minify: {
        collapseWhitespace: true
      },
      "chunks": {
        "head": {
          "css": ["main.bundle.css"]
        },
      },
      hash: true
    })
  ]
};
if (!isProd) {
  config.devtool = '#eval-source-map';
} else {
  config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ])

}

module.exports = config;