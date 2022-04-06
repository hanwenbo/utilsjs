---
title: Divider
---

```jsx
import React from 'react';
import { Space, Divider, Button, View, ThemeManager, Text } from "@hanwenbo/ui-web"

export default () => {
  return <View style={{
      backgroundColor:"#f8f8f8"
  }}>
    <Divider
      style={{
        justifyContent: "flex-start",
      }}
      childrenStyle={{
        marginLeft: 15
      }}
    ><Text h4>我只是想工作高效一些</Text></Divider>
    <Divider><Text subheading blue>我只是想工作高效一些</Text></Divider>
    <Divider
      style={{
        justifyContent: "flex-end",
      }}
      childrenStyle={{
        marginRight: 15
      }}
    ><Text h4>我只是想工作高效一些</Text></Divider>
  </View>
}
```
