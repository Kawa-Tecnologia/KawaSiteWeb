const path = require('path');

module.exports = {
  // outras configurações do webpack...

  module: {
    rules: [
      // outras regras...

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, 'src') // inclui apenas arquivos CSS dentro da pasta src
      }
    ]
  }

  // outras configurações do webpack...
};