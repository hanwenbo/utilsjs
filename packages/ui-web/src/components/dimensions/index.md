# Dimensions 响应视口

```jsx
import React, { useEffect, useState } from 'react';
import { Space, Divider, Button, View, Dimensions, Text, useWindowDimensions } from "@hanwenbo/ui-web"
import { DemoBlock } from 'demos'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
export default () => {
  const [screenDims, setScreen] = useState(Dimensions.get('screen'));
  const [windowDims, setWindow] = useState(Dimensions.get('window'));


  const hook_windowWidth = useWindowDimensions().width;
  const hook_windowHeight = useWindowDimensions().height;


  useEffect(() => {
    const handleChange = ({ screen, window: win }) => {
      setScreen(screen);
      setWindow(win);
    };

    const subscription = Dimensions.addEventListener('change', handleChange);
    return () => {
      subscription.remove();
    };
  }, [setScreen, setWindow]);
  return <View style={{
    backgroundColor: "#f8f8f8"
  }}>
    <DemoBlock title='基础'>
      <Space vertical>
        <Text>一次获取窗口: 宽{windowWidth}，高{windowHeight}</Text>
        <Text>动态屏幕: 宽{screenDims.width}，高{screenDims.height}</Text>
        <Text>动态窗口: 宽{windowDims.width}，高{windowDims.height}</Text>
      </Space>
    </DemoBlock>

    <DemoBlock title='全部信息'>
      <Space vertical>
        <Text style={{ marginVertical: '1em' }} suppressHydrationWarnings={true}>
          window: {JSON.stringify(windowDims, null, 2)}
        </Text>
        <Text suppressHydrationWarnings={true}>screen: {JSON.stringify(screenDims, null, 2)}</Text>
      </Space>
    </DemoBlock>
    <DemoBlock title='hook'>
      <Text>
        {hook_windowWidth}， {hook_windowHeight}
      </Text>
    </DemoBlock>
  </View>
}
```
