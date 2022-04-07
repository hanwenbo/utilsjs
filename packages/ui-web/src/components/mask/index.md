---
title: Mask
---

```jsx
import React, { useState } from 'react'
import { Space, Divider, Button, View, ThemeManager, Text,Mask } from "@hanwenbo/ui-web"

const DemoBlock = ({ title = null, children }) => {
  return <View>
    <Text>{title}</Text>
    {children}
  </View>
}

// 基础用法
const Simple = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button onPress={() => setVisible(true)}>显示遮罩层</Button>
      <Mask visible={visible} onMaskClick={() => setVisible(false)} />
    </>
  )
}

// 自定义内容
const WithContent = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Mask 
        visible={visible} 
        onMaskClick={() => setVisible(false)}
      >
        <View style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 150,
          height: 150,
          marginTop: -75,
          marginLeft: -75,
          background: "#fff",
          borderRadius: 16,
          padding:20
        }}>
          <Text>这是一个自定义的遮罩层</Text>
        </View>
      </Mask>
      <Button onPress={() => setVisible(true)}>显示带内容的遮罩层</Button>
    </>
  )
}

// 遮罩层的颜色深度 - 深一些
const Thick = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Mask
        visible={visible}
        onMaskClick={() => setVisible(false)}
        thick
      />
      <Button onPress={() => setVisible(true)}>显示深一些的遮罩层</Button>
    </>
  )
}

// 遮罩层的颜色深度 - 浅一些
const Thin = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Mask
        visible={visible}
        onMaskClick={() => setVisible(false)}
        thin
      />
      <Button onPress={() => setVisible(true)}>显示浅一些的遮罩层</Button>
    </>
  )
}

// 遮罩层的颜色深度 - 自定义
const CustomOpacity = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Mask
        visible={visible}
        onMaskClick={() => setVisible(false)}
        style={{
          backgroundColor:"red"
        }}
      />
      <Button onPress={() => setVisible(true)}>显示自定义透明度的遮罩层</Button>
    </>
  )
}

// 白色的遮罩层
const White = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button onPress={() => setVisible(true)}>显示白色的遮罩层</Button>
      <Mask
        style={{
          backgroundColor:"white"
        }}
        visible={visible}
        onMaskClick={() => setVisible(false)}
      />
    </>
  )
}

export default () => {
  return <View style={{
    width: 375,
    backgroundColor: "#f8f8f8",
    position:'relative'
  }}>
    <DemoBlock title='基础用法'>
      <Simple />
    </DemoBlock>

    <DemoBlock title='遮罩层的颜色深度'>
      <Space wrap>
        <Thin />
        <Thick />
        <CustomOpacity />
      </Space>
    </DemoBlock>

    <DemoBlock title='白色的遮罩层'>
      <White />
    </DemoBlock>

    <DemoBlock title='自定义内容'>
      <WithContent />
    </DemoBlock>
  </View>
}
```

