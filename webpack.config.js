module.exports = {
    entry  : './index.js',
    output : {
        path     : './build',
        filename : 'bundle.dist.js'
    },
    module : {
        loaders: [ { 
            test   : /.js$/,
            loaders : ['react-hot', 'babel-loader?' + JSON.stringify({presets: ["es2015", "stage-0", "react"]})],
            exclude: "./node_modules/",
        }],
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    }
};
