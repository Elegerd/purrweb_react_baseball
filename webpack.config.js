const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PATHS = {
  src: path.join(__dirname, "./src"),
  dist: path.join(__dirname, "./dist"),
  assets: "assets/",
};

const PAGES_DIR = PATHS.src;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter((fileName) => fileName.endsWith(".html"));

module.exports = {
  entry: {
    app: PATHS.src,
  },
  output: {
    path: PATHS.dist,
    publicPath: "/",
    filename: `${PATHS.assets}js/[name].[hash].js`,
  },
  externals: {
    paths: PATHS,
  },
  resolve: {
    alias: {
      "@components": path.resolve(PATHS.src, "components"),
      "@common_components": path.resolve(PATHS.src, "common_components"),
      "@actions": path.resolve(PATHS.src, "store/actions"),
      "@reducers": path.resolve(PATHS.src, "store/reducers"),
      "@routines": path.resolve(PATHS.src, "store/routines"),
      "@sagas": path.resolve(PATHS.src, "store/sagas"),
      "@selectors": path.resolve(PATHS.src, "store/selectors"),
      "@utils": path.resolve(PATHS.src, "utils"),
      "@assets": path.resolve(PATHS.src, "assets"),
    },
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          name: "[hash].[ext]",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`,
      chunkFilename: "[id].css",
      ignoreOrder: false,
    }),
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page}`,
        })
    ),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
