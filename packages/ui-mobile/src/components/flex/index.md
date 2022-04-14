# Flex 布局

<code src="./demos/demo1.tsx"></code>


```code
export interface FlexProps
  extends Partial<Pick<ViewProps,
    | 'style'>> {
  children: React.ReactNode;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  flex?: number
}
```
