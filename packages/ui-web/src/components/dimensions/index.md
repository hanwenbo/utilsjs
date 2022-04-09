# Dimensions 响应视口

```jsx
import React, { useEffect, useState } from 'react';
import { Space, Divider, Button, View, Dimensions, Text, } from "@hanwenbo/ui-web"

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');
export default () => {
  const [screenDims, setScreen] = useState(Dimensions.get('screen'));
  const [windowDims, setWindow] = useState(Dimensions.get('window'));

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
    <Text>窗口: 宽{windowWidth} 高{windowHeight}</Text>
    <Text style={{ marginVertical: '1em' }} suppressHydrationWarnings={true}>
      window: {JSON.stringify(windowDims, null, 2)}
    </Text>
    <Text suppressHydrationWarnings={true}>screen: {JSON.stringify(screenDims, null, 2)}</Text>
  </View>
}
```
