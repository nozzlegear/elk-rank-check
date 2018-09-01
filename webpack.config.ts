const MinifyPlugin = require("babel-minify-webpack-plugin");
const path = require("path");
const fs = require("fs");
const nodeExternals = require("webpack-node-externals");
const env = process.env;
import webpack = require("webpack");

function resolve(filePath: string) {
    return path.join(__dirname, filePath);
}

/**
 * Takes a list of plugins and only returns those that are not undefined. Useful when you only pass plugins in certain conditions.
 */
function filterPlugins<T>(plugins: T[]): T[] {
    return (plugins || []).filter(plugin => !!plugin);
}

const isProduction = process.argv.indexOf("-p") >= 0;

console.log("Bundling for " + (isProduction ? "production" : "development") + "...");

const babelOptions = {
    presets: [
        [
            "env",
            {
                targets: {
                    browsers: ["last 2 versions"]
                }
                // "modules": true
            }
        ]
    ]
};

const excludeNodeModules = /node_modules\/(?!(react-win-dialog)\/).*/;

const config: webpack.Configuration = {
    target: "web",
    entry: resolve("./src/client/index.tsx"),
    devtool: isProduction ? undefined : "source-map",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: babelOptions
                    },
                    "ts-loader"
                ],
                exclude: excludeNodeModules
            },
            {
                test: /\.js$/,
                exclude: excludeNodeModules,
                use: {
                    loader: "babel-loader",
                    options: babelOptions
                }
            },
            {
                test: /\.styl[us]?$/,
                use: ["style-loader", "css-loader?url=false", "stylus-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".styl", ".stylus"],
        modules: [resolve("./node_modules/")]
    },
    output: {
        filename: "client.js",
        path: resolve("./public/js"),
        // Important: publicPath must begin with a / but must not end with one. Else hot module replacement won't find updates.
        publicPath: "/public/js"
    },
    plugins: filterPlugins([
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        isProduction ? new MinifyPlugin({}, { sourceMap: true }) : undefined,
        isProduction ? undefined : new webpack.NoEmitOnErrorsPlugin(),
        isProduction ? undefined : new webpack.HotModuleReplacementPlugin()
    ])
};

module.exports = config;
