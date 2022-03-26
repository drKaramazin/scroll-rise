const path = require('path');

module.exports = {
    mode: "development",
    entry: {},
    devServer: {
        static: {
            directory: path.join(__dirname, 'docs'),
        },
        compress: false,
        port: 9000,
    },
};
