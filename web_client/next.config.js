const withPlugins = require('next-compose-plugins')
const withCSS = require('@zeit/next-css')
const path = require('path')
const withTM = require('next-transpile-modules')
const withSass = require('@zeit/next-sass')

const nextConfig = {
    exportPathMap: function() {
        return { '/': {page: '/posts'} }
    },
    env: {
        domain: 'http://localhost:3030',
        api_prefix: 'http://localhost:3030/api/v1',
    },
    webpackDevMiddleware: config => {
        // This is important when you want use HMR with docker
        config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300
        }
        return config
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
        },
        transpileModules: [
            'object-to-formdata'
        ]
    }],
    [withTM, {
        // Transpile modules in node_modules that is written in ES6+
        transpileModules: ['object-to-formdata']
    }],
    [withSass]
], nextConfig)
