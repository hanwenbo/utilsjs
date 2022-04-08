import { Button, Dialog } from '@hanwenbo/ui-web'
import { DemoBlock } from 'demos'
import React from 'react'

export default () => {
  return (
    <DemoBlock title='关闭所有对话框'>
      <Button block onPress={ContinuousShow}>
        连续展示对话框
      </Button>
    </DemoBlock>
  )
}

// 连续展示
function ContinuousShow() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      Dialog.alert({
        content: <Button onPress={() => Dialog.clear()}>close all</Button>,
        onConfirm: () => {
          console.log('Confirmed')
        },
      })
    }, i * 500)
  }
}
