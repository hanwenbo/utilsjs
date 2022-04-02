---
title: Button
---

```jsx
import React from 'react';
import Button from "./index"
import View from "../view"
import ButtonStyle from "../../style/button"
import ViewStyle from "../../style/view"

export default () => {
  ViewStyle.loadView({
    row: {
      flexDirection: "row"
    },
  })
  ButtonStyle.loadButton({
    primary: {
      backgroundColor: "red",
      paddingHorizontal:15,
      paddingVertical:10,
      borderRadius:5,
    },
  });
  ButtonStyle.loadButtonText({
    primary: {
      color:'#FFFFFF',
    },
  });
  return <View>
    <Button>
      可点击
    </Button>
    <Button disabled>
      不可以点击
    </Button>
    <View row>
      <Button loading primary>
        加载中
      </Button>
    </View>
    <View row>
    <Button primary>
      可点击
    </Button>
    </View>
  </View>
}
```
