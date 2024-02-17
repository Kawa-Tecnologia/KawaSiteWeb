import { resolve } from 'path';

export const module = {
  rules: [
    // outras regras...
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      // eslint-disable-next-line no-undef
      include: resolve(__dirname, 'src') // inclui apenas arquivos CSS dentro da pasta src
    }
  ]
};