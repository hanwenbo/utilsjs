# AutoCenter

```jsx
import React from 'react'
import { AutoCenter, Text,View } from '@hanwenbo/ui-web'
import { DemoBlock, lorem } from 'demos'

const shortText = lorem.generateWords(3)
const longText = lorem.generateParagraphs(2)

export default () => {
  return (
    <>
      <DemoBlock title='内容不够整行宽度时自动居中'>
        <AutoCenter>
          <Text>{shortText}</Text>
        </AutoCenter>
      </DemoBlock>

      <DemoBlock title='内容达到满宽后保持正常的左对齐'>
        <AutoCenter><Text>{longText}</Text></AutoCenter>
      </DemoBlock>

      <DemoBlock title='内容达到满宽后保持正常的左对齐'>
        <AutoCenter><Text h2>{shortText}</Text></AutoCenter>
      </DemoBlock>

      <DemoBlock title='内容达到满宽后保持正常的左对齐'>
        <AutoCenter>
          <View style={{
              backgroundColor:"blue"
          }}><Text h2 white>{shortText}</Text></View>
        </AutoCenter>
      </DemoBlock>
    </>
  )
}
```
