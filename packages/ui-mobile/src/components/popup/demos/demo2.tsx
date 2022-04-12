import React, { useState } from 'react'
import { Popup, Space, Button } from '@hanwenbo/ui-mobile'
import { DemoBlock } from 'demos'

export default () => {
  const [visible1, setVisible1] = useState(true)
  const [visible2, setVisible2] = useState(false)

  return (
    <>
      <DemoBlock title='多层堆叠'>
        <Button
          onPress={() => {
            setVisible1(true)
          }}
        >
          展开第一个弹出层
        </Button>
        <Popup
          visible={visible1}
          onMaskClick={() => {
            setVisible1(false)
          }}
          bodyStyle={{ height: '40vh' }}
        >
          <div style={{ padding: '24px' }}>
            <Space vertical>
              <div>这是弹出层1</div>
              <Button
                onPress={() => {
                  setVisible2(true)
                }}
              >
                展开第二个弹出层
              </Button>
            </Space>
          </div>
        </Popup>
        <Popup
          visible={visible2}
          onMaskClick={() => {
            setVisible2(false)
          }}
          bodyStyle={{ height: '20vh' }}
        >
          <div style={{ padding: '24px' }}>
            <div>这是弹出层2</div>
          </div>
        </Popup>
      </DemoBlock>
    </>
  )
}
