---
title: Modal
---

```jsx
import React, { useState } from 'react'
import { Space, Divider, Button, View, ThemeManager, Text, Mask, Modal } from "@hanwenbo/ui-web"

const DemoBlock = ({ title = null, children }) => {
  return <View>
    <Text>{title}</Text>
    {children}
  </View>
}


export default () => {
  return <View style={{
    width: 375,
    backgroundColor: "#f8f8f8",
    position: 'relative'
  }}>
    <Space vertical>
      <Button
        block
        onPress={() =>
          Modal.alert({
            content: '人在天边月上明',
            onConfirm: () => {
            },
          })
        }
      >
        最简单的弹窗
      </Button>
      <Button
        block
        onPress={() => {
          Modal.alert({
            content: '点击遮罩关闭',
            closeOnMaskClick: true,
          })
        }}
      >
        点击遮罩关闭
      </Button>
      <Button
        block
        onPress={() => {
          Modal.alert({
            title: '带关闭图标的弹窗',
            content: '右上角有个关闭的小图标，点击它也可以关闭弹窗',
            showCloseButton: true,
          })
        }}
      >
        显示关闭图标
      </Button>
    </Space>
    <DemoBlock title='操作按钮'>
      <Space vertical>
        <Button
          onPress={() => {
            Modal.show({
              content: '人在天边月上明，风初紧，吹入画帘旌',
              closeOnAction: true,
              actions: [
                {
                  key: 'online',
                  text: '在线阅读',
                  primary: true,
                },
                {
                  key: 'download',
                  text: '下载文件',
                },
                {
                  key: 'share',
                  text: '分享',
                },
              ],
            })
          }}
        >
          自定义按钮
        </Button>
        <Divider />
        <Button
          onPress={() =>
            Modal.confirm({
              content: '是否提交申请',
              onConfirm: async () => {
                  console.warn('提交申请')
                // await sleep(3000)
                // Toast.show({
                //   icon: 'success',
                //   content: '提交成功',
                //   position: 'bottom',
                // })
              },
            })
          }
        >
          异步操作执行成功
        </Button>
        <Button
          onPress={() =>
            Modal.confirm({
              content: '是否提交申请',
              onConfirm: async () => {
                throw new Error()
              },
            })
          }
        >
          异步操作执行失败
        </Button>
        <Button
          onPress={() => {
            Modal.show({
              content: '点击遮罩关闭',
              closeOnMaskClick: true,
            })
          }}
        >
          无操作按钮
        </Button>
      </Space>
    </DemoBlock>
  </View>
}
```

