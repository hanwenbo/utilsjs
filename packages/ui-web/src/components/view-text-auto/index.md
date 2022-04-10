# ViewTextAuto 视图文本自动适配

在React Native里View里是不可以直接嵌套文本的，例如做按钮组件的时候需要先判断内容是否为文本，如果是要包裹一个Text组件，不是则直接输出，否则RN抛出异常导致挂掉；

```jsx
import React from 'react';
import { View,ViewTextAuto } from "@hanwenbo/ui-web"

export default () => {
  return <View>
    <ViewTextAuto>直接输出文本，不报错</ViewTextAuto>
  </View>
}
```
