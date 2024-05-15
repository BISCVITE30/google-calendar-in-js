const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const config = {
        entry: './src/scripts/index.js',
        output: {
            filename: './bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.s?css$/i,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
            ]
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
        ],

        devServer: {
        port: 9000,
        hot: true,
        },
    };

    if(isProduction) {
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: '[name].css'
            })
        );
    }

    return config;
}