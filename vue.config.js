const path = require('path');

module.exports = {
    chainWebpack: config => {
        const oneOfsMap = config.module.rule('scss').oneOfs.store
        oneOfsMap.forEach(item => {
            item.use('sass-resources-loader')
                .loader('sass-resources-loader')
                .options({
                    resources: [
                        path.resolve(__dirname, './src/styles/variable.scss'),
                        path.resolve(__dirname, './src/styles/env.scss'),
                    ]
                })
                .end()
        })
    },
    devServer: {
        host : '0.0.0.0',
        hot : true,
        overlay: {
            info : true,
                warnings: true,
                errors: true
        }
    }
};

