import React, { useState, useRef } from 'react'
import { Button, Dialog, Space, Toast, Divider ,View} from '@hanwenbo/ui-mobile'
import { DemoBlock, DemoDescription, lorem } from 'demos'
import { ExclamationCircleFill } from 'antd-mobile-icons'

export default () => {
  return (
    <View style={{
      width:'100vw'
    }}>
      <DemoBlock title='内容区域'>
        <Space vertical block>
          <Button
            block
            onPress={() => {
              Dialog.alert({
                header: (
                  <ExclamationCircleFill
                    style={{
                      fontSize: 64,
                      marginTop:20
                    }}
                  />
                ),
                title: '注意',
                content: (
                  <>
                    <div>请用手机拍摄手持工牌照，注意保持照片清晰1</div>
                    <div>
                      详情说明请查阅<a>操作指引</a>
                    </div>
                  </>
                ),
              })
            }}
          >
            自定义内容区域
          </Button>
          <Button
            block
            onPress={() => {
              Dialog.alert({
                image:
                  'https://gw.alipayobjects.com/mdn/rms_efa86a/afts/img/A*SE7kRojatZ0AAAAAAAAAAAAAARQnAQ',
                title: '手持工牌照示例',
                content: '请用手机拍摄手持工牌照，注意保持照片清晰',
              })
            }}
          >
            有标题和图片
          </Button>
          <Button
            block
            onPress={() =>
              Dialog.confirm({
                title: '提示',
                content: lorem.generateParagraphs(7),
              })
            }
          >
            超长文本
          </Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='获取点击结果'>
        <Space vertical block>
          <Button
            block
            onPress={async () => {
              await Dialog.alert({
                content: '人在天边月上明',
              })
              Toast.show({ content: '已关闭', position: 'bottom' })
            }}
          >
            等待 alert 完成
          </Button>
          <DemoDescription content='alert 和 confirm 方法都会返回一个 Promise，你可以通过这个 Promise 实现等待弹窗关闭' />
          <Divider />
          <Button
            block
            onPress={async () => {
              const result = await Dialog.confirm({
                content: '人在天边月上明',
              })
              if (result) {
                Toast.show({ content: '点击了确认', position: 'bottom' })
              } else {
                Toast.show({ content: '点击了取消', position: 'bottom' })
              }
            }}
          >
            等待 confirm 完成
          </Button>
          <DemoDescription content='confirm 返回的是 Promise<boolean> 你可以通过这个 boolean 来判断用户是点击的确认还是取消' />
        </Space>
      </DemoBlock>

      <DemoBlock title='声明式'>
        <Space vertical block>
          <Declarative />
          <DemoDescription content='你可以手动控制 visible 状态' />
        </Space>
      </DemoBlock>

      <DemoBlock title='自定义关闭操作'>
        <Space vertical block>
          <Imperative />
          <DemoDescription content='你可以根据需求，自定义关闭弹窗的时机' />
        </Space>
      </DemoBlock>
    </View>
  )
}

// 声明式
const Declarative = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button
        block
        onPress={() => {
          setVisible(true)
        }}
      >
        显示对话框
      </Button>
      <Dialog
        visible={visible}
        content='人在天边月上明1'
        closeOnAction
        onClose={() => {
          setVisible(false)
        }}
        actions={[
          {
            key: 'confirm',
            text: '我知道了',
          },
        ]}
      />
    </>
  )
}

// 自定义关闭操作
function Imperative() {
  const handler = useRef()

  return (
    <Button
      block
      onPress={() => {
        handler.current = Dialog.show({
          content: '人在天边月上明，风初紧，吹入画帘旌',
          actions: [
            {
              key: 'close',
              text: '关闭',
              onPress: () => {
                if (Math.random() > 0.5) {
                  handler.current?.close()
                } else {
                  Toast.show('再试一下')
                }
              },
            },
          ],
        })
      }}
    >
      显示对话框
    </Button>
  )
}
