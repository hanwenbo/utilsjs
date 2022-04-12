import React, { useState } from 'react'
import { Button, ProgressBar, Space } from '@hanwenbo/ui-mobile'
import { DemoBlock } from 'demos'

export default () => {
  const [percent, setPercent] = useState<number>(10)
  return (
    <>
      <DemoBlock title='基本用法'>
        <Space vertical block>
          <Space>
            <Button
              primary
              disabled={percent === 100}
              onPress={() => {
                setPercent(pre => pre + 10)
              }}
              style={{ marginRight: '8px' }}
            >
              进度+10
            </Button>
            <Button
              primary
              fillOutline
              onPress={() => {
                setPercent(10)
              }}
            >
              重置
            </Button>
          </Space>
          <ProgressBar percent={percent} />
        </Space>
      </DemoBlock>

      <DemoBlock title='指定线条宽度'>
        <Space vertical block>
          <ProgressBar
            percent={50}
          />
          <ProgressBar
            percent={75}
            trackWidth={5}
          />
          <ProgressBar
            percent={100}
            trackWidth={7}
          />
        </Space>
      </DemoBlock>

      <DemoBlock title='指定颜色'>
        <ProgressBar
          percent={50}
          trackColor={'yellow'}
          fillColor={'green'}
        />
      </DemoBlock>
    </>
  )
}
