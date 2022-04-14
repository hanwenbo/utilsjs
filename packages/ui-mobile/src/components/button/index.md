# Button 按钮

```jsx
import React from 'react';
import { Space, Divider, Button, View, ThemeManager, Text, StyleSheet } from "@hanwenbo/ui-mobile"

ThemeManager.loadTheme({
  View: {
    mb: {
      marginBottom: 10
    },
  },
  Button: {
    mb: {
      marginBottom: 10
    },
    primary: {},
    Text: {
      primary: {
        color: "#FFFFFF"
      },
    },
  }
})
export default () => {
  return <View>
    <Button style={{
      flex: 1,
      backgroundColor: "#FF0000",
    }}>
      style 填充样式
    </Button>
    <Button style={styles.button}>
      StyleSheet 创建样式
    </Button>
    <Button style={[styles.button, {
      backgroundColor: 'green',
      borderColor: 'yellow',
      borderWidth: 5,
    }]}>
      StyleSheet 创建样式 + style填充
    </Button>
    <Button>
      块
    </Button>
    <View row>
      <Button mb>
        可点击
      </Button>
    </View>
    <View row>
      <Button disabled mb>
        不可以点击
      </Button>
    </View>
    <View row>
      <Button loading primary mb>
        加载中
      </Button>
    </View>
    <View row mb>
      <Button primary mb>
        可点击
      </Button>
    </View>
    <View row mb middle>
      <Button primary mini>
        Mini
      </Button>
      <Button primary small>
        Mini
      </Button>
      <Button primary middle>
        Mini
      </Button>
      <Button primary large>
        Mini
      </Button>
    </View>
    <View row mb middle>
      <Button default mini>
        Mini
      </Button>
      <Button default small>
        Mini
      </Button>
      <Button default middle>
        Mini
      </Button>
      <Button default large>
        Mini
      </Button>
    </View>
    <View row mb middle>
      <Button success mini>
        Mini
      </Button>
      <Button success small>
        Mini
      </Button>
      <Button success middle>
        Mini
      </Button>
      <Button success large>
        Mini
      </Button>
    </View>
    <View row mb middle>
      <Button danger mini>
        Mini
      </Button>
      <Button danger small>
        Mini
      </Button>
      <Button danger middle>
        Mini
      </Button>
      <Button danger large>
        Mini
      </Button>
    </View>
    <View row mb middle>
      <Button warning mini>
        Mini
      </Button>
      <Button warning small>
        Mini
      </Button>
      <Button warning middle>
        Mini
      </Button>
      <Button warning large>
        Mini
      </Button>
    </View>
    <View row mb middle>
      <Button link>
        Link
      </Button>
      <Button dashed>
        Dashed
      </Button>
    </View>
    <View row mb middle>
      <Button primary round>
        圆角
      </Button>
      <Button primary rectangular>
        方块
      </Button>
      <Button primary block>
        块块块
      </Button>
    </View>
    <View>
      <Button primary block>
        块块块
      </Button>
    </View>
  </View>
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
  }
});
```

*/

```

