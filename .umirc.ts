import {join} from 'path';

export default {
  title: 'JS Utils',
  alias: {
    '@hanwenbo/ui-mobile': join(__dirname, 'packages/ui-mobile/src'),
    '@hanwenbo/web-editor': join(__dirname, 'packages/web-editor/src'),
    'demos': join(__dirname, 'demos'),
  },
  hash: true,
  base: '/utilsjs/',
  publicPath: '/utilsjs/',
  // ...
  themeConfig: {
    carrier: 'dumi', // 设备状态栏左侧的文本内容
    hd: {
      // 根据不同的设备屏幕宽度断点切换高清方案
      rules: [
        // { maxWidth: 375, mode: 'vw', options: [100, 750] },
        // { minWidth: 376, maxWidth: 750, mode: 'vw', options: [100, 1500] },
      ],
      // 更多 rule 配置访问 https://github.com/umijs/dumi/blob/master/packages/theme-mobile/src/typings/config.d.ts#L7
    }
  },
};
