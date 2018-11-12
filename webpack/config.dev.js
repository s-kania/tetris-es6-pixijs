import config from "./config.shared.js";

import path from "path";
import webpack from "webpack";
import copyWebpackPlugin from "copy-webpack-plugin";

export default {

    ...config,

    devtool: "#source-map",

    plugins: [
        ...config.plugins,
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        ...config.module
    },

    historyApiFallback: {
        index: "index.html"
    },

    contentBase: path.resolve(`${__dirname}/../static`)
};
