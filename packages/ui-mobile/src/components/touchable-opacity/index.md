# TouchableOpacity 可触摸不透明度

```jsx
import React from 'react';
import {TouchableOpacity, View, ThemeManager } from "@hanwenbo/ui-mobile"

export default () => {
  ThemeManager.loadTheme({
    View: {
      body: {
        width: 100,
        height: 100,
        backgroundColor: 'red'
      }
    }
  });
  return <View>
    <TouchableOpacity>
      <View body />
    </TouchableOpacity>
  </View>
}
```
