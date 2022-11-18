const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin");
const { ProvidePlugin } = require("webpack");
const json5 = require("json5");

module.exports = {
  performance: { hints: false },
  entry: {
    main: {
      import: "./src/js/main.js",
      filename: "js/main.[contenthash].js",
    },
    index: {
      import: "./src/js/index.js",
      filename: "js/index.[contenthash].js",
      dependOn: "main",
    },
  },
  output: {
    path: `${__dirname}/dist`,
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
      chunks: ["main", "index"],
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),
    new ImageMinimizerWebpackPlugin({
      minimizerOptions: {
        plugins: [
          ["gifsicle", { interlaced: true }],
          ["jpegtran", { progressive: true }],
          ["optipng", { optimizationLevel: 5 }],
        ],
      },
    }),
    new ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },

      {
        test: /.s?css$/,
        use: [
          MiniCssExtractPlugin.loader, "css-loader", "sass-loader",
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[hash][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        generator: {
          filename: "fonts/[name][ext]",
        },
        use: {
          loader: "url-loader",
        },
      },
      {
        test: /\.json5$/i,
        type: "json",
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
};
