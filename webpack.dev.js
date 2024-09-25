const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const localProxy = {
    target: 'http://localhost:8081',
    ignorePath: false,
    changeOrigin: true,
    secure: false,
};

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        allowedHosts: 'auto',
        static: [
            {directory: path.join(__dirname, 'public'), watch: false},
            {directory: __dirname, watch: false}
        ],
        hot: true,
        proxy: [
            {context: ['/api'], ...localProxy}
        ],
        watchFiles: 'src/**/*'
    },
    devtool: 'inline-source-map',
    plugins: [

    ]
});
