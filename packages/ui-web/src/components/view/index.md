---
title: View
---

```jsx
import React from 'react';
import ViewStyle from "../../style/view"
import View from "./index"

export default () => {
  ViewStyle.loadView({
    body: { backgroundColor: 'red', width: 100, height: 100 },
  });

  return <View>
    <View body />
  </View>
}
```
