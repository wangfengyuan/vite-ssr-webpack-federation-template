const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const threadLoader = require('thread-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;

const isProd = process.env.NODE_ENV === 'production';
const cpuNum = require('os').cpus().length;

const tsWorkerPool = {
    workers: 6,
    poolTimeout: isProd ? 500 : Infinity,
};

const cssWorkerPool = {
    workers: cpuNum - tsWorkerPool.workers,
    poolTimeout: isProd ? 500 : Infinity,
};

threadLoader.warmup(tsWorkerPool, ['esbuild-loader']);
threadLoader.warmup(cssWorkerPool, ['css-loader']);


module.exports = {
    target: ['web', 'es5'],
    entry: {
        index: './src/index.ts' // 入口文件
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isProd ? 'javascript/[name].[contenthash:5].js' : '[name].js', // [name] 是entry的key
        publicPath: isProd ? './' : '/'
    },
    devtool: 'eval-source-map',
    output: {
        filename: `js/[name].js`,
        chunkFilename: `js/[name].js`,
    },
    stats: {
        modules: false,
        children: false
    },
    module: {
        rules: [
            {
                test: /\.[jt]s$/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: tsWorkerPool
                    },
                    {
                        loader: 'esbuild-loader',
                        options: {
                            loader: 'ts',
                            target: 'es2015',
                            tsconfigRaw: require('./tsconfig.json')
                        },
                    },
                ],
                include: [path.resolve(process.cwd(), 'src')],
                exclude: [/node_modules/, path.resolve(process.cwd(), 'src/vendor')],
            },
            {
                test: /\.vue\.s[ac]ss/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                ]
            },
            {
                test: /\.css$/,
                sideEffects: true,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'thread-loader',
                        options: cssWorkerPool
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                        }
                    },
                    {
                        loader: 'esbuild-loader',
                        options: {
                            loader: 'css',
                            minify: true
                        }
                    }
                ],
            },
            {
              test: /\.ejs$/,
              use: ['underscore-template-loader'],
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/i,
                loader: 'url-loader',
                options: {
                    // 字体不要 base64 化
                    limit: 4096,
                    publicPath: '../',
                    name: 'font/[name].[ext]'
                },
            },
            {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4096,
                            publicPath: '../',
                            name: 'images/[name].[hash:8].[ext]',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            // 生产环境启用压缩
                            disable: process.env.NODE_ENV === 'production' ? false : true,
                            // 压缩 jpg/jpeg 图片
                            mozjpeg: {
                                progressive: true,
                                quality: 80 // 压缩率
                            },
                            // 压缩 png 图片
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            }
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
        ],
    },
    mode: "development",
    plugins: [
        new MiniCssExtractPlugin({
          filename: process.env.NODE_ENV === 'development' ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
        }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify('<% version %>'),
        }),
        new WebpackManifestPlugin({
            fileName: 'app-manifest.json',
        }),
        new VueLoaderPlugin(),
        ...[process.env.WEBPACK_BUNDLE ? new BundleAnalyzerPlugin() : () => {}],
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html',
        }),
        new ModuleFederationPlugin({
            filename: "remoteEntry.js", // 提供给其他服务加载的文件
            name: "vue2remote", // 唯一ID，用于标记当前服务
            library: { type: "var", name: "vue2remote" },
            exposes: {
                './Header': "./src/components/NavHeader.vue",
                './Footer': "./src/components/Footer.vue",
            }
        })
    ],
    devServer: {
        compress: true,
        port: 5000,
        host: '127.0.0.1',
        hot: true,
    },
};