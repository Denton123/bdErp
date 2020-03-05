const path = require("path");

const vuxLoader = require('vux-loader')

module.exports = {
    pages: {
        credit: {
            entry: './src/credit.js',
            filename: 'credit.html',
            chunks: ['chunk-vendors', 'chunk-common', 'credit']
        },
        erp: {
            entry: './src/main.js',
            filename: 'erp.html',
            chunks: ['chunk-vendors', 'chunk-common', 'erp']
        },
    },
    outputDir: path.resolve(__dirname, "./dist/"),
    assetsDir: "./inventory/static/",
    configureWebpack: config => {
        vuxLoader.merge(config, {
            plugins: [{
                    name: 'vux-ui'
                },
                {
                    name: 'less-theme',
                    path: 'src/style/theme.less'
                },
            ]
        })
    },
    devServer: {
        disableHostCheck: true,
    },
}