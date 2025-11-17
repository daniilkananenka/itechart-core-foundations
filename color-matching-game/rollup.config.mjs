import copy from 'rollup-plugin-copy';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/script.js',
    format: 'cjs',
  },
  plugins: [
    copy({
      targets: [{ src: 'src/styles.css', dest: 'dist' }],
    }),
  ],
};
