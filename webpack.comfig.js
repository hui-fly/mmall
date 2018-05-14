module.exports = {
  mode:'production',
  entry: "./src/page/index/index.js",//已多次提及的唯一入口文件
  output: {
    path: "./dist",//打包后的文件存放的地方
    filename: "main.js"//打包后输出文件的文件名
  }
}
