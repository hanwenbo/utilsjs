# Divider 分割线

```jsx
import React from 'react';
import { Space, Divider, Button, View, ThemeManager, Text } from "@hanwenbo/ui-mobile"

export default () => {
  return <View style={{
    backgroundColor: "#f8f8f8"
  }}>
    <Divider contentPosition={'left'}><Text h4 primary>左边</Text></Divider>
    <Divider contentPosition={'left'} shortSideWidth={"20%"}><Text subheading success>左边20%</Text></Divider>
    <Divider contentPosition={'left'} shortSideWidth={5}><Text subheading danger>左边5像素</Text></Divider>
    <Divider contentPosition={'center'}><Text h4 warning>中间</Text></Divider>
    <Divider contentPosition={'right'}><Text h4 primary>右边</Text></Divider>
    <Divider childrenStyle={{
      paddingHorizontal: 0
    }}><Text h4 success>紧贴</Text></Divider>
  </View>
}
```
