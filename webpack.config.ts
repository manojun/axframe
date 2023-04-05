import * as webpack from "webpack";
import * as path from "path";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");

const isDev: boolean = process.env.NODE_ENV === "development";

const config: webpack.Configuration = {
  mode: process.env.NODE_ENV as "development" | "production",
  entry: ["/src/index.tsx"],
  output: {
    filename: "[name].bundle.js",
    path: path.join(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "swc-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [!isDev ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        use: [
          !isDev ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff2|eot|woff|ttf)$/,
        type: "asset/resource",
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: "asset",
      },
      {
        test: /\.txt$/i,
        type: "asset/source",
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    fallback: { buffer: false },
  },
  plugins: [
    new webpack.DefinePlugin(
      Object.assign({
        "process.env": {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          API_PHASE: JSON.stringify(process.env.API_PHASE ?? "local"),
        },
      })
    ),
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        { from: "*.css", context: path.resolve(__dirname, "public") },
        { from: "*.jpg", context: path.resolve(__dirname, "public") },
        // { from: "*.png", context: path.resolve(__dirname, "public") },
        { from: "*.ico", context: path.resolve(__dirname, "public") },
        { from: "404.html", context: path.resolve(__dirname, "public") },
      ],
    }),
    new MiniCssExtractPlugin({
      attributes: {
        id: "target",
        "data-target": "example",
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      devServer: isDev,
    }),
    new HtmlWebpackPlugin({ template: path.join(__dirname, "public", "index.html"), publicPath: "/" }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        app: {
          test: /[\\/]src[\\/](?!pages)/,
          chunks: "all",
          enforce: true,
          name(module: webpack.Configuration): string {
            if (!module.context) return "app";

            const match = module.context.match(/([^\\/]*?)[\\/]([^\\/]*?)$/);

            if (!match) return "app";

            const [, parent, child] = match;

            return `app.${parent.replace("@", "")}${child ? `.${child.replace("@", "")}` : ""}`;
          },
          priority: -30,
        },
        vendor: {
          test: /[\\/](?:node_modules|plugins)[\\/]|]/,
          chunks: "all",
          enforce: true,
          name(module: webpack.Configuration): string {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context?.match(/[\\/](?:node_modules|plugins)[\\/](.*?)([\\/]|$)/)?.[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${(packageName ?? "").replace("@", "")}`;
          },
          priority: -10,
          reuseExistingChunk: true,
        },
      },
    },
    minimize: !isDev,
    mergeDuplicateChunks: true,
    removeAvailableModules: true,
    removeEmptyChunks: true,
  },
};

export default config;
