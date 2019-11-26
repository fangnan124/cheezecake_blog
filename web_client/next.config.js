const withPlugins = require('next-compose-plugins')
const withCSS = require('@zeit/next-css')
const path = require('path')

const nextConfig = {
    exportPathMap: function() {
        return { '/': {page: '/posts'} }
    }
}

module.exports = withPlugins([
    [withCSS, {
        webpack: function (config) {
            config.module.rules.push({
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                use: ['url-loader']
            })
            config.resolve.modules.push(path.resolve('./'))
            return config
        }
    }]
], nextConfig)
