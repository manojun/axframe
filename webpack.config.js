"use strict";
var _a;
var _b;
exports.__esModule = true;
var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CopyPlugin = require("copy-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");
var zlib = require("zlib");
var isDev = process.env.NODE_ENV === "development";
var config = {
    mode: process.env.NODE_ENV,
    entry: ["/src/index.tsx"],
    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, "dist"),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "swc-loader"
                }
            },
            {
                test: /\.css$/i,
                use: [!isDev ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"]
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
                                javascriptEnabled: true
                            }
                        }
                    },
                ]
            },
            {
                test: /\.(woff2|eot|woff|ttf)$/,
                type: "asset/resource"
            },
            {
                test: /\.(png|svg|jpg)$/,
                type: "asset"
            },
            {
                test: /\.txt$/i,
                type: "asset/source"
            },
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        fallback: { buffer: false }
    },
    plugins: [
        new webpack.DefinePlugin(Object.assign({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                API_PHASE: JSON.stringify((_b = process.env.API_PHASE) !== null && _b !== void 0 ? _b : "local")
            }
        })),
        new CompressionPlugin({
            filename: "[path][base].br",
            algorithm: "brotliCompress",
            test: /\.(js|css|html|svg)$/,
            compressionOptions: {
                params: (_a = {},
                    _a[zlib.constants.BROTLI_PARAM_QUALITY] = 11,
                    _a)
            },
            threshold: 10240,
            minRatio: 0.8,
            deleteOriginalAssets: false
        }),
        new CopyPlugin({
            patterns: [
                { from: "*.css", context: path.resolve(__dirname, "public") },
                { from: "*.jpg", context: path.resolve(__dirname, "public") },
                // { from: "*.png", context: path.resolve(__dirname, "public") },
                { from: "*.ico", context: path.resolve(__dirname, "public") },
                { from: "404.html", context: path.resolve(__dirname, "public") },
            ]
        }),
        new MiniCssExtractPlugin({
            attributes: {
                id: "target",
                "data-target": "example"
            }
        }),
        new ForkTsCheckerWebpackPlugin({
            async: true,
            devServer: isDev
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
                    name: function (module) {
                        if (!module.context)
                            return "app";
                        var match = module.context.match(/([^\\/]*?)[\\/]([^\\/]*?)$/);
                        if (!match)
                            return "app";
                        var parent = match[1], child = match[2];
                        return "app.".concat(parent.replace("@", "")).concat(child ? ".".concat(child.replace("@", "")) : "");
                    },
                    priority: -30
                },
                vendor: {
                    test: /[\\/](?:node_modules|plugins)[\\/]|]/,
                    chunks: "all",
                    enforce: true,
                    name: function (module) {
                        var _a, _b;
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        var packageName = (_b = (_a = module.context) === null || _a === void 0 ? void 0 : _a.match(/[\\/](?:node_modules|plugins)[\\/](.*?)([\\/]|$)/)) === null || _b === void 0 ? void 0 : _b[1];
                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return "npm.".concat((packageName !== null && packageName !== void 0 ? packageName : "").replace("@", ""));
                    },
                    priority: -10,
                    reuseExistingChunk: true
                }
            }
        },
        minimize: !isDev,
        mergeDuplicateChunks: true,
        removeAvailableModules: true,
        removeEmptyChunks: true
    }
};
exports["default"] = config;
