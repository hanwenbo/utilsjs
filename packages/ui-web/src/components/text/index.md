---
title: Text
---

```jsx
import React from 'react';
import Color from "../../style/color"
import { Space, Divider, Button, View, ThemeManager, ColorManager, Text } from "@hanwenbo/ui-web"

export default () => {
  ColorManager.loadColors({
    colorDemo: "red",
  })
  ThemeManager.loadTheme({
    Text: {
      heading: { fontSize: 16, fontWeight: "600" },
      subheading: { fontSize: 14 },
      body: { fontSize: 14 },
      description: { fontSize: 14, color: "#666" },
      red: {
        color: ColorManager.getColor("colorDemo")
      }
    }
  })
  return <View>
    <Text h1>我只是想工作高效一些</Text>
    <Text h2>我只是想工作高效一些</Text>
    <Text h3>我只是想工作高效一些</Text>
    <Text h4>我只是想工作高效一些</Text>
    <Text h5>我只是想工作高效一些</Text>
    <Text subheading>我只是想工作高效一些</Text>
    <Text subheading>我只是想工作高效一些</Text>
    <Text subheading red>我只是想工作高效一些</Text>
  </View>
}
```
