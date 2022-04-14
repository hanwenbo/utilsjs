import React from 'react'
import {Flex, Text,} from '@hanwenbo/ui-mobile'
import {DemoBlock, lorem} from 'demos'

const shortText = lorem.generateWords(3)
const longText = lorem.generateParagraphs(2)
export default () => {
  return (
    <>
      <DemoBlock title='基础用法'>
        <Flex justify={'between'} style={{
          backgroundColor: "green",
          padding: 15,
          borderWidth: 5,
          borderColor: 'blue'
        }}>
          <Text>左边</Text>
          <Text>右边</Text>
        </Flex>
      </DemoBlock>
      <DemoBlock title='占位数量'>
        <Flex justify={'between'}>
          <Flex flex={2} style={{borderWidth: 1}}><Text>{shortText}</Text></Flex>
          <Flex flex={1} style={{borderWidth: 1}}><Text>{shortText}</Text></Flex>
          <Flex flex={1} style={{borderWidth: 1}}><Text>{shortText}</Text></Flex>
        </Flex>
      </DemoBlock>
    </>
  )
}
