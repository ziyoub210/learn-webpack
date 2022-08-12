const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require("vue-loader");
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const Happypack = require('happypack')
const os = require('os');
const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'
const handleCss =  [
    isDev ? 'vue-style-loader': MiniCssExtractPlugin.loader, 
    'css-loader',
    'postcss-loader'
]
module.exports = Object.assign(
    {
        entry: './src/main.js',
        output: {
            filename: 'bundle.[hash:10].js',
            path: path.resolve(__dirname, 'dist')
        },
        mode: process.env.NODE_ENV,
        optimization: {
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin(),
                isProd && new TerserPlugin({
                    parallel: false,
                    extractComments: false
                })
            ].filter(Boolean)
        },
        
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    use: [
                        {
                            loader: 'vue-loader'
                        }
                    ] 
                },
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: "Happypack/loader?id=js"
                        }
                    ],
                   
                },
                {
                    test: /\.ts$/,
                    use: ['ts-loader']
                },
                {
                    test: /\.css$/,
                    use: handleCss,
                },
                {
                    test: /\.less$/,
                    use: [...handleCss,'less-loader']
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                      {
                        loader: "url-loader",
                        options: {
                          limit: 50,
                          outputPath: "img/",
                        },
                      },
                    ],
                  },
            ]
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            },
            extensions: ['.vue', '.js', '.ts']
        },
        plugins: [
            new CleanWebpackPlugin(),
            new Happypack({
                id: "js",
                loaders: [{
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    options: {
                        cacheDirectory: true
                    }
                }],
                threads: os.cpus().length
              }),
            new HtmlWebpackPlugin({
                template: './public/index.html'
            }),
            isProd && new MiniCssExtractPlugin({
                filename: "css/main.css",
            }),
            new VueLoaderPlugin(),
            
        ].filter(Boolean)
    },
    isProd  ? {} : {
        devServer:{  port: 3000,
            hot: true}
       
    },

)

