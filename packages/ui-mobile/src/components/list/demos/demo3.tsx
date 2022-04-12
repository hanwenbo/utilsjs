import { List } from '@hanwenbo/ui-mobile'
import React from 'react'

export default () => {
  function handleClick() {
    // ...
  }
  return (
    <List mode='card' header='卡片模式'>
      <List.Item extra='按照支付设置的顺序扣款' onPress={handleClick}>
        扣款方式
      </List.Item>
      <List.Item extra='200元' onPress={handleClick}>
        月限额
      </List.Item>
      <List.Item onPress={handleClick}>帮助中心</List.Item>
      <List.Item onPress={handleClick}>关闭服务</List.Item>
    </List>
  )
}
