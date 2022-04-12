# Grid 栅格

<code src="./demos/demo1.tsx"></code>

## Grid

### 属性

| 属性    | 说明           | 类型                                                    | 默认值 |
| ------- | -------------- | ------------------------------------------------------- | ----- |
| columns | 列数           | `number`                                                | -     |
| gap     | 格子之间的间距 | `number \| [number , number]` | `0`    |

## Grid.Item

### 属性

| 属性    | 说明     | 类型                                                            | 默认值 |
| ------- | -------- | --------------------------------------------------------------- | ------ |
| span    | 跨度     | `number`                                                        | `1`    |
| onClick | 点击事件 | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void` | -      |

## FAQ

### Grid 组件的兼容性说明

靠右边的元素会根据余数补全（计算过程中无限小数点场景），每个Grid.Item并非完全相等
