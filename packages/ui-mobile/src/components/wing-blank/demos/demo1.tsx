import React from 'react'
import {Flex, Text, WingBlank, WhiteSpace, View} from '@hanwenbo/ui-mobile'
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
          <View style={{
            backgroundColor: "yellow"
          }}>
            <WingBlank size={15}>
              <WhiteSpace size={15} />
              <View style={{
                backgroundColor: 'red',
              }}>
                <Text>longText</Text>
              </View>
              <WhiteSpace size={15} />
            </WingBlank>
          </View>
          <Text>右边</Text>
        </Flex>
      </DemoBlock>
    </>
  )
}
