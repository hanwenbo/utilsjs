# Space 间距

```jsx
import React from 'react';
import { Space, Divider, Button, View, ThemeManager, Text } from "@hanwenbo/ui-web"

const DemoBlock = ({ title = null, children }) => {
  return <View>
    <Text>{title}</Text>
    {children}
  </View>
}
export default () => {
  return <View style={{
    width: 375,
    backgroundColor: "#f8f8f8",
  }}>
    <DemoBlock title={'水平方向'}>
      <Space>
        <Button>按钮1</Button>
        <Button>按钮2</Button>
        <Button>按钮3</Button>
      </Space>
    </DemoBlock>
    <DemoBlock title='换行'>
      <Space wrap>
        <Button>按钮1</Button>
        <Button>按钮2</Button>
        <Button>按钮3</Button>
        <Button>按钮4</Button>
        <Button>按钮5</Button>
        <Button>按钮6</Button>
        <Button>按钮7</Button>
        <Button>按钮8</Button>
        <Button>按钮9</Button>
        <Button>按钮10</Button>
        <Button>按钮11</Button>
      </Space>
    </DemoBlock>
    <DemoBlock title='垂直方向的间距'>
      <Space vertical>
        <Button>按钮1</Button>
        <Button>按钮2</Button>
        <Button>按钮3</Button>
      </Space>
    </DemoBlock>

    <DemoBlock title='自定义间距大小'>
      <Space gap={35}>
        <Button>按钮1</Button>
        <Button>按钮2</Button>
        <Button>按钮3</Button>
      </Space>
    </DemoBlock>


    <DemoBlock title='主轴对齐方式'>
      <Space style={{
        justifyContent: "center",
      }}>
        <Button>1</Button>
        <Button>
          2<br />2
        </Button>
        <Button>
          3<br />3<br />3
        </Button>
      </Space>
    </DemoBlock>

    <DemoBlock title='交叉轴对齐方式'>
      <Space style={{
        alignItems: "flex-end",
      }}>
        <Button>1</Button>
        <Button>
          2<br />2
        </Button>
        <Button>
          3<br />3<br />3
        </Button>
      </Space>
    </DemoBlock>
  </View>
}
```

