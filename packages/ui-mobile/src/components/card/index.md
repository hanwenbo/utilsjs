# Card 卡片

<code src="./demos/demo1.tsx"></code>

### 属性

| 属性           | 说明                | 类型                                                            | 默认值 |
|--------------| ------------------- | --------------------------------------------------------------- | ------ |
| title        | header 左边区域     | `ReactNode`                                                     | -      |
| extra        | header 右边区域     | `ReactNode`                                                     | -      |
| headerStyle  | header 自定义样式   | `React.CSSProperties`                                           | -      |
| headerTitleStyle  | header 自定义样式   | `React.CSSProperties`                                           | -      |
| bodyStyle    | body 自定义样式     | `React.CSSProperties`                                           | -      |
| onPress      | 卡片点击事件        | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void` | -      |
| onHeaderPress | header 区域点击事件 | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void` | -      |
| onBodyPress  | body 区域点击事件   | `(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void` | -      |
