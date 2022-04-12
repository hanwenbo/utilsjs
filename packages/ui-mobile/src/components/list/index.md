# List 列表

<code src="./demos/demo1.tsx"></code>

<code src="./demos/demo2.tsx"></code>

<code src="./demos/demo3.tsx"></code>

<code src="./demos/demo4.tsx"></code>

## List

### 属性

| 属性   | 说明                   | 类型                  | 默认值      |
| ------ | ---------------------- | --------------------- | ----------- |
| header | 标题内容               | `ReactNode`           | -           |
| mode   | 支持默认和卡片两种模式 | `'default' \| 'card'` | `'default'` |

## List.Item

### 属性

| 属性        | 说明                                                            | 类型                            | 默认值                                                     |
| ----------- | --------------------------------------------------------------- | ------------------------------- | ---------------------------------------------------------- |
| title       | 列表项中间上部的标题区域                                        | `ReactNode`                     | -                                                          |
| children    | 列表项中间的主内容区域                                          | `ReactNode`                     | -                                                          |
| description | 列表项中间下部的描述区域                                        | `ReactNode`                     | -                                                          |
| prefix      | 列表项左侧区域                                                  | `ReactNode`                     | -                                                          |
| extra       | 列表项右侧区域                                                  | `ReactNode`                     | -                                                          |
| clickable   | 是否显示点击效果                                                | `boolean`                       | 当 `onPress` 属性存在时，默认为 `true`，否则默认为 `false` |
| arrow       | 右侧是否显示箭头图标，也支持传入 `ReactNode` 来自定义图标       | `boolean \| ReactNode`          | 默认和 `clickable` 的值保持一致                            |
| disabled    | 是否禁用                                                        | `boolean`                       | `false`                                                    |
| onPress     | 列表项的点击事件，当设置了 `onPress` 属性时，列表项会有点击效果 | `(e: React.MouseEvent) => void` | -                                                          |


## FAQ

### 列表能否支持虚拟滚动？

List 本身不会支持虚拟滚动，可以结合 [react-virtualized](https://github.com/bvaughn/react-virtualized) 实现。
