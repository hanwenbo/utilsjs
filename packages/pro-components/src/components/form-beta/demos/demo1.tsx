import React from 'react'
import {FormBeta} from '@hanwenbo/pro-components'
import {DemoBlock, lorem} from 'demos'

const shortText = lorem.generateWords(3)
const longText = lorem.generateParagraphs(2)
export default () => {
  return (
    <>
      <DemoBlock title='基础用法'>
        <Flex direction={'column'} style={{
          backgroundColor: "green",
          padding: 15,
          borderWidth: 5,
          borderColor: 'blue'
        }}>
          <View style={{
            backgroundColor:"red"
          }}>
            <Text>longText</Text>
            <Text>longText</Text>
          </View>
          <WhiteSpace size={15} />
          <View style={{
            backgroundColor:"blue"
          }}>
            <Text>longText</Text>
            <Text>longText</Text>
          </View>
        </Flex>
      </DemoBlock>
    </>
  )
}
