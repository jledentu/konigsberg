var webpackConfig = require('./webpack.config.js');
webpackConfig.devtool = 'inline-source-map';
webpackConfig.module.rules.push({
    test: /\.ts$/,
    enforce: 'post',
    loader: 'istanbul-instrumenter-loader',
    exclude: [
        'node_modules',
        /\.test\.ts$/
    ]
});

module.exports = function(config) {
    config.set({
        browsers: [ 'PhantomJS' ],

        files: [
            {
                pattern: 'test/**/*.test.js',
                watched: false
            }
        ],

        frameworks: ['mocha'],

        preprocessors: {
            'test/**/*.test.js': ['webpack']
        },

        reporters: ['mocha', 'coverage'],

        webpack: webpackConfig,

        webpackMiddleware: {
            quiet: true,
            stats: {
                colors: true
            }
        },

        coverageReporter: {
            type : 'json',
            dir : 'coverage/',
            subdir: '.',
            file: 'coverage.json'
        }
    });
};
