export default {
  cjs: 'babel',
  esm: {
    type: 'babel',
    importLibToEs: true
  },
  pkgFilter: {
    // include: ['@hanwenbo/ui-mobile','@hanwenbo/web-editor']
    // include: ['@hanwenbo/web-editor']
    // include: ['@hanwenbo/ui-mobile']
    include: ['@hanwenbo/pro-components']
  }
};
