import React, {useState, useRef, useEffect} from 'react'
import {FloatingPanel, List, Button, AutoCenter, View, Text, Space} from '@hanwenbo/ui-mobile'
import {DemoBlock, lorem} from 'demos'

const shortText = lorem.generateWords(3)
const longText = lorem.generateParagraphs(2)
const data = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
]

const anchors = [0, 10, 50, 100]

export default () => {
  const [floatingHeight, setFloatingHeight] = useState(0);
  const floatRef = useRef(null);

  useEffect(() => {
    floatRef?.current?.setHeight(100)
  }, [])

  return (
    <div style={{
      backgroundColor: "#000",
    }}>
      <div style={floatingHeight !== 0 ? {
        filter: 'blur(2px)'
      } : {}}>
        <DemoBlock title='内容不够整行宽度时自动居中'>
          <AutoCenter>
            <Text>{shortText}</Text>
          </AutoCenter>
        </DemoBlock>
        <Text white>浮动高度：{floatingHeight}</Text>
        <Space>
          <Button primary onPress={() => {
            floatRef?.current?.setHeight(100)
          }}>打开</Button>
          <Button primary onPress={() => {
            floatRef?.current?.setHeight(0)
          }}>关闭</Button>
          <Button primary onPress={() => {
            floatRef?.current?.setHeight(window.innerHeight * 0.4)
          }}>第三阶段</Button>
          <Button primary onPress={() => {
            floatRef?.current?.setHeight(window.innerHeight * 0.8)
          }}>第四阶段</Button>
        </Space>

        <DemoBlock title='内容达到满宽后保持正常的左对齐'>
          <AutoCenter><Text>{longText}</Text></AutoCenter>
        </DemoBlock>

        <DemoBlock title='内容达到满宽后保持正常的左对齐'>
          <AutoCenter><Text h2>{shortText}</Text></AutoCenter>
        </DemoBlock>

        <DemoBlock title='内容达到满宽后保持正常的左对齐'>
          <AutoCenter>
            <View style={{
              backgroundColor: "blue"
            }}><Text h2 white>{shortText}</Text></View>
          </AutoCenter>
        </DemoBlock>
      </div>
      <div>
        <FloatingPanel
          anchors={anchors}
          borderRadius={30}
          wrapStyle={{
            backgroundColor: 'rgb(237 255 0 / 71%)',
            paddingBottom:100,// 防止拖拽超出边界露出底部颜色
          }}
          ref={floatRef}
          onHeightChange={(height, animating) => {
            setFloatingHeight(height)
          }}
        >
          <View style={{
            margin: 15
          }}>
            <Button danger onPress={() => {
              floatRef.current.setHeight(0)
            }}>关闭</Button>
            <Button>测试</Button>
            <Button>测试</Button>
            <Button>测试</Button>
            <Button>测试</Button>
            <Button>测试</Button>
            <List>
              {data.map((item, index) => (
                <List.Item key={index}>{item}</List.Item>
              ))}
            </List>
          </View>
        </FloatingPanel>
      </div>
    </div>
  )
}
