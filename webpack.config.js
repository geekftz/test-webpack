const webpack = require("webpack");
const path = require("path");

// ########################################################################
// no runtime
// module.exports = {
//   entry: {
//     app: path.join(__dirname, "src/foo.js"),
//   },
//   output: {
//     filename: "[name].[chunkhash].js",
//     path: path.join(__dirname, "dist"),
//   },
// };

// ########################################################################

// split runtime
// module.exports = {
//   entry: {
//     app: path.join(__dirname, "src/foo.js"),
//   },
//   output: {
//     filename: "[name].[chunkhash].js",
//     path: path.join(__dirname, "dist"),
//   },
//   plugins: [
//     new webpack.optimize.CommonsChunkPlugin({
//       name: "runtime",
//     }),
//   ],
// };

// ########################################################################
// use hash
// module.exports = {
//   entry: {
//     app: path.join(__dirname, "src/foo.js"),
//   },
//   output: {
//     filename: "[name].[hash].js",
//     path: path.join(__dirname, "dist"),
//   },
//   plugins: [
//     new webpack.optimize.CommonsChunkPlugin({
//       name: "runtime",
//     }),
//   ],
// };

// ########################################################################
// 3rd package

// module.exports = {
//   entry: {
//     app: path.join(__dirname, "src/foo.js"),
//     vendor: ["react"], // 所有类库都可以在这里声明
//   },
//   output: {
//     filename: "[name].[chunkhash].js",
//     path: path.join(__dirname, "dist"),
//   },
//   plugins: [
//     // 单独打包，app中就不会出现类库代码
//     // 必须放在runtime之前
//     new webpack.optimize.CommonsChunkPlugin({
//       name: "vendor",
//     }),
//     new webpack.optimize.CommonsChunkPlugin({
//       name: "runtime",
//     }),
//   ],
// };

// ########################################################################
// 3rd package
// 因为我们多加入了一个文件，对于 webpack 来说就是多了一个模块，默认情况下 webpack 的模块都是以一个有序数列命名的，
// 也就是 [0,1,2....]，我们中途加了一个模块导致每个模块的顺序变了，vendor 里面的模块的模块 id 变了，所以 hash 也就变了。
module.exports = {
  entry: {
    app: path.join(__dirname, "src/foo.js"),
    vendor: ["react"], // 所有类库都可以在这里声明
  },
  output: {
    filename: "[name].[chunkhash].js",
    path: path.join(__dirname, "dist"),
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    // new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "runtime",
    }),
  ],
};
