---
title: Text
---

```jsx
import React from 'react';
import Text from './index';
import View from '../view'
import Typography from "../../style/typography"
import Color from "../../style/color"

export default () => {
  Typography.loadTypographies({
    heading: { fontSize: 16, fontWeight: "600" },
    subheading: { fontSize: 14 },
    body: { fontSize: 14 },
    description: { fontSize: 14, color: "#666" },
    h1: { fontSize: 38, lineHeight: 46, color: "#000", fontWeight: "600" },
    h2: { fontSize: 30, lineHeight: 40, color: "#000", fontWeight: "600" },
    h3: { fontSize: 30, lineHeight: 32, color: "#000", fontWeight: "600" },
    h4: { fontSize: 20, lineHeight: 28, color: "#000", fontWeight: "600" },
    h5: { fontSize: 16, lineHeight: 24, color: "#000", fontWeight: "600" },
  });
  Color.loadColors({
    blue:"blue",
    red:"red",
  })
  return <View>
    <Text h1>我只是想工作高效一些</Text>
    <Text h2>我只是想工作高效一些</Text>
    <Text h3>我只是想工作高效一些</Text>
    <Text h4>我只是想工作高效一些</Text>
    <Text h5>我只是想工作高效一些</Text>
    <Text subheading blue>我只是想工作高效一些</Text>
    <Text subheading red>我只是想工作高效一些</Text>
  </View>
}
```
