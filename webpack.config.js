const path = require('path')
const VueLoaderPlugin = require("vue-loader/lib/plugin")
//引入html-webpack-plugin插件（生成html文件）
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


//在package.json文件里面配置的cross-env设置的变量都是存在process对象的
//用一个变量开判断是否是开发环境
const isDev = process.env.NODE_ENV === 'development'

//使用变量来存储config的配置，方便开发环境和发布环境的优化
const config = {
  mode: "development", //启用哪种模式(3种参数，development,production,none)
  //拼接成绝对路径
  entry: path.join(__dirname, "src/index.js"),
  output: {
    filename: "bundel.js",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "dist"
            }
          },
          "css-loader",
          "vue-style-loader"
        ]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.scss$/,
        use: [
          //这里的有个小坑，就是css-loader必须放在sass-loader的前面，不然会报错
          "vue-style-loader",
          "css-loader",
          "sass-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(jpg||png||git||svg||jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              //指定图片大小
              limit: 1024,
              //ext为文件的扩展名
              name: "[name]-aaa.[ext]"
            }
          }
        ]
      },
      {
        test: /\.jsx$/,
        use: ["babel-loader"]
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！（vue-url-loader）
    new VueLoaderPlugin(),
    //使用html-webpack-plugin来生成html文件
    new HtmlWebpackPlugin({
      //html-webpack-plugin配置可以看文档（https://github.com/jantimon/html-webpack-plugin#configuration）
      title: "vue-todos"
    }),
    //创建可在配置全局常量的编译，通过NODE_ENV的值来区分开发环境和发布环境
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    //把css单独打包出来（包括js里面的css）
    new MiniCssExtractPlugin({
      filename: "style.[name].css",
      chunkFilename: "[id].css"
    })
  ]
};

module.exports = config;
//是开发环境
if (isDev) {
    //映射代码（更方便阅读打包后的代码，进行调试）
    config.devtool = "#cheap-module-eval-source-map"; //(官方文档：https://webpack.js.org/configuration/devtool/#development)
    //配置webpack-dev-server（创建web服务器，实时浏览器更新）
    config.devServer = { //从根目录提供文件，默认打开的是8080的端口，也可以自己设置端口
        //port： 8000
        contentBase: "./dist", //指定要使用的主机，方便调试
        host: "0.0.0.0", //错误信息
        overlay: { //这里在全屏显示错误信息，还可以指定显示警告信息warnings: true
            errors: true
        }, //自动数据刷新
        hot: true
    };
    config.plugins.push(
      //加入热模块，这个也是webpack自带的一个模块。
      new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin());
}