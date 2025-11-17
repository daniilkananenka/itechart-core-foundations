import copy from 'rollup-plugin-copy';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/script.js',
    format: 'cjs',
  },
  plugins: [
    typescript(),
    copy({
      targets: [{ src: 'src/styles.css', dest: 'dist' }],
    }),
  ],
};
