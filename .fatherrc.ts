export default {
  cjs: 'babel',
  esm: {
    type: 'babel',
    importLibToEs: true
  },
  pkgFilter: {
    include: ['@hanwenbo/ui-mobile','@hanwenbo/web-editor']
  }
};
