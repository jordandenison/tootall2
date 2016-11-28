module.exports = {
  devtool: 'sourcemap',
  output: {
    filename: 'scripts/dist.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /\.jsx?$/,
        query: { presets: ['es2015', 'react'] },
        include: [ /src/ ]
      }
    ]
  }
}
