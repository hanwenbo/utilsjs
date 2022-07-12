export default {
  esm: {
    output: 'es',
    ignores: [
      '**/demos/*'
    ],
  },
  cjs: {
    output: 'lib',
    ignores: [
      '**/demos/*'
    ],
  },
  platform: 'browser',
};
