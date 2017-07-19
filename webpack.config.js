// Webpack
var webpack = require('webpack');

// Config
const config = {
  entry: './js/index.js',
  output: {
    filename: "./js/dist/bundle.js"
  },

  module: {
    rules: [
      
    	// Babel Loader
    	{
    	  test: /\.js$/,
        exclude: /(node_modules)/,
    	  use: [{
    	    loader: 'babel-loader'
    	  }],
    	},

      { 
        test: /\.json$/, 
        // loader: 'json-loader'
        use: [ 'json-loader' ]
      },

    	// CSS Loader
    	{
    	  test: /\.css$/,
    	  use: [ 'style-loader', 'css-loader' ]
    	},

    ]

  }

};

module.exports = config;

