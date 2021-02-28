const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

let mode = "development"
let target = "web"

if (process.env.NODE_ENV === "production ") {
    mode = "production"
    target = "browserslist"
}

module.exports = {
    mode: mode,
    target: target,

    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.[contenthash].js',
        assetModuleFilename: 'images/[hash][query][ext]'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        })
    ],

    module: {
        rules: [
            {
                test: /\.(gif|jpg|png|jpeg|svg)$/i,
                type: 'asset/resource'
            },
            //@TODO FONTS
            // {
            //     test: /\.(woff|woff2|eot|ttf|otf)$/,
            //     use: {
            //         loader: 'url-loader',
            //     },
            // },
            // {
            //     test: /\.(woff|woff2|eot|ttf|otf)$/i,
            //     type: 'asset/resource',
            //
            // },
            {
                // Include sass, scss, css
                test: /\.(s[ac]|c)ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ""
                        }
                    },
                    {
                        loader: "css-loader",
                    },

                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: 'resolve-url-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                // Include ts, tsx, js, and jsx files.
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }

        ],
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },

    devtool: mode = "development" ? "source-map" : false,

    devServer: {
        contentBase: "./dist",
        hot: true
    }
}