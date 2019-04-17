var ScreepsWebpackPlugin = require('./screepsWebpackPlugin')

var screepsOptions = {
	email: 'carver230620',
	password: '5560',
	serverUrl: 'http://screeps-server.codecamp.edu:21025'
  }

module.exports = {
  target: 'node',
  entry: './screeps/main.js',
  output: {
	path: __dirname + '/dist',
    filename: 'main'
  },
  plugins: [new ScreepsWebpackPlugin(screepsOptions)]
}