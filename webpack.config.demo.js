const path = require('path');

module.exports = {
    mode: "production",
    output: {
        clean: true,
        path: path.resolve(__dirname, 'demo-build/dist'),
        filename: "BeatSaberAvatar.js"
    }
}