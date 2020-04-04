import progress from 'rollup-plugin-progress';
import minify from 'rollup-plugin-babel-minify';
export default {
  input: './src/index.js',
  plugins: [
    minify({comments: false}),
    progress({clearLine: false}),
  ],
  output: {
    file: './dist/js/main.js',
    format: 'iife',
    compact: true,
  },
};
