var ScreepsWebpackPlugin = require('./screepsWebpackPlugin')

var screepsOptions = {
  // email: 'carver230620',
  email: 'carver230620-sandbox',
  password: '5560',
  serverUrl: 'http://screeps-server.codecamp.edu:21025'
}

module.exports = {
  target: 'node',
  entry: './screeps/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js',
    libraryTarget: 'commonjs2'
  },
  devtool: 'source-map',
  externals: {
    'main.js.map': 'main.js.map',
    'temp.js.map': 'temp.js.map'
  },
  plugins: [new ScreepsWebpackPlugin(screepsOptions)]
}