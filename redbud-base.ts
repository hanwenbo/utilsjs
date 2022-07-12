export default {
  esm: {},
  cjs: {},
  platform: 'browser',
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@sensoro-design/antd',
        libraryDirectory: 'es',
        style: true
      }
    ]
  ]
};
