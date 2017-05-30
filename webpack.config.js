/**
 * Created by xiaobxia on 2017/5/30.
 */
const path = require("path");
module.exports = {
    entry: './js/xbx-core.js',
    output: {
        filename: 'xbx-core.js',
        path: path.resolve(__dirname, 'dist/js'),
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-2']
                }
            }
        ]
    }
};