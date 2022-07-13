<h1 align="center">hanwenbo utils</h1>

<h3 align="center">小巧实用的工具类库</h3>

[![NPM version](https://img.shields.io/npm/v/@hanwenbo/utilsjs.svg?style=flat)](https://npmjs.org/package/@hanwenbo/utilsjs)
[![NPM downloads](http://img.shields.io/npm/dm/@hanwenbo/utilsjs.svg?style=flat)](https://npmjs.org/package/@hanwenbo/utilsjs)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org)

## ✨ 特性

- 🚀 快速，使用简单，每个包只提供一种功能，可单独安装
- 📦 基于 rollup 进行打包，提供`cjs`、`es`、`umd`三种格式
- 💻 使用 TypeScript 构建，提供完整的类型定义文件

## 🏗 安装

```
# npm 安装
npm install @hanwenbo/utilsjs --save

# yarn 安装 推荐
yarn add  @hanwenbo/utilsjs
```

**可独立安装每个独立的功能包**

**推荐使用方法**

```
// 只引入需要使用的包
import isFunction from '@hanwenbo/某包';
```

## 📦 packages

<!-- start-directory -->
|包名|描述|
|---|---|
|[@hanwenbo/array](https://github.com/hanwenbo/utilsjs/tree/master/./packages/array/)|常用的数组操作|
|[@hanwenbo/object](https://github.com/hanwenbo/utilsjs/tree/master/./packages/object/)|常用的对象操作|
|[@hanwenbo/pro-components](https://github.com/hanwenbo/utilsjs/tree/master/./packages/pro-components/)|utils library for pro-components|
|[@hanwenbo/ui-mobile](https://github.com/hanwenbo/utilsjs/tree/master/./packages/ui-mobile/)|A mobile UI library for React Native Web|
|[@hanwenbo/web-editor](https://github.com/hanwenbo/utilsjs/tree/master/./packages/web-editor/)|Web Editor|

<!-- end-directory -->

## ⌨️ 本地开发

```
# 克隆项目到本地
git clone git@github.com:hanwenbo/utilsjs.git

# 切换到项目目录
cd ./utilsjs

# 安装依赖
yarn bootstarp

# 发布
npm login --registry https://registry.npmjs.org
npm run release --registry https://registry.npmjs.org

如果错过了发布 可以使用强行发布
npx lerna publish --force-publish
单独发某个包
npx lerna publish --force-publish @hanwenbo/pro-components

跳过 git提交 会把package.json代码恢复 慎用
npx lerna publish --skip-git 
```

