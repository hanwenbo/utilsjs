---
title: Divider
---

```jsx
import React from 'react';
import Text from '../text';
import View from '../view'
import Typography from "../../style/typography"
import Color from "../../style/color"
import Divider from "./index"

export default () => {
  Typography.loadTypographies({
    heading: { fontSize: 16, fontWeight: "600" },
    subheading: { fontSize: 14 },
    body: { fontSize: 14 },
    description: { fontSize: 14, color: "#666" },
    h4: { fontSize: 20, lineHeight: 28, color: "#000", fontWeight: "600" },
    ml15: { marginLeft: 15 },
  });
  Color.loadColors({
    blue: "blue",
    red: "red",
  })
  return <View>
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
