var path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'konigsberg.js',
        library: 'konigsberg',
        libraryTarget: 'umd',
        devtoolModuleFilenameTemplate: `[resource-path]` 
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.(js|ts)$/,
                use: "source-map-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.js', '.json', '.ts']
    },
    devtool: 'source-map'
};
