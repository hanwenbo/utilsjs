import React from 'react'
import {Card, Toast, Button} from '@hanwenbo/ui-web'
import {DemoBlock} from 'demos'
import {AntOutline, RightOutline} from 'antd-mobile-icons'

import styles from './demo1.less'

export default () => {
  const onPress = () => {
    Toast.show('点击了卡片')
  }

  const onHeaderPress = () => {
    Toast.show('点击了卡片Header区域')
  }

  const onBodyPress = () => {
    Toast.show('点击了卡片Body区域')
  }
  return (
    <>
      <DemoBlock title='基本用法' background='gray'>
        <Card title='卡片标题' onPress={onPress}>
          卡片内容
        </Card>
      </DemoBlock>

      <DemoBlock title='没有卡片内容' background='gray'>
        <Card title='卡片标题' onPress={onPress} />
      </DemoBlock>

      <DemoBlock title='没有卡片标题' background='gray'>
        <Card onPress={onPress}>卡片内容</Card>
      </DemoBlock>

      <DemoBlock title='自定义卡片内容' background='gray'>
        <Card
          title={
            <div style={{fontWeight: 'normal'}}>
              <AntOutline style={{marginRight: '4px', color: '#1677ff'}} />
              卡片标题
            </div>
          }
          extra={<RightOutline />}
          onBodyPress={onBodyPress}
          onHeaderPress={onHeaderPress}
          style={{borderRadius: '16px'}}
        >
          <div className={styles.content}>卡片内容</div>
          <div className={styles.footer} onClick={e => e.stopPropagation()}>
            <Button
              primary
              onPress={() => Toast.show('点击了底部按钮')}
            >
              底部按钮
            </Button>
          </div>
        </Card>
      </DemoBlock>

      <DemoBlock title='自定义卡片样式' background='gray'>
        <Card
          headerTitleStyle={{
            color: '#1677ff',
          }}
          title='卡片标题'
        >
          卡片内容
        </Card>
      </DemoBlock>
    </>
  )
}
