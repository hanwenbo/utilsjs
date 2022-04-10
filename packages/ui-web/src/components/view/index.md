# View 视域
```jsx
import React from 'react';
import { View, ThemeManager } from "@hanwenbo/ui-web"

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
    <View body />
  </View>
}
```
