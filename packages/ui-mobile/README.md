<h1 align="center">@hanwenbo/ui-mobile</h1>

> 数组操作

## 📦 安装

```
// npm
npm install @hanwenbo/ui-mobile --save

// yarn
yarn add @hanwenbo/ui-mobile

```

## 🔨 使用



```tsx
import { Colors, Typography, Spacings } from "@hanwenbo/ui-mobile";
import { ThemeManager } from "react-native-ui-lib";
// Load your foundations and presets (colors, typography, spacings, etc...)
Colors.loadColors({
  primaryColor: "#2364AA",
  secondaryColor: "#81C3D7",
  textColor: "##221D23",
  errorColor: "#E63B2E",
  successColor: "#ADC76F",
  warnColor: "##FF963C",
});

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

Spacings.loadSpacings({
  page: 15,
  card: 15,
  gridGutter: 15,
});



// with a dynamic function
ThemeManager.setComponentTheme("Button", (props, context) => {
  // 'square' is not an original Button prop, but a custom prop that can
  // be used to create different variations of buttons in your app
  if (props.square) {
    return {
      borderRadius: 0,
    };
  }
});

export const Theme = {};

```

For example, the following line

```jsx
<Text h1 pink>Hello World</Text>
```

