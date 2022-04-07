import React from 'react'
import {Grid, Text} from '@hanwenbo/ui-web'
import {DemoBlock} from 'demos'
import {StyleSheet, View} from "react-native-web"

export default () => {
  const list  = [1,2,3,4,5,6,7,8]
  return (
    <>
      <DemoBlock title='基础用法'>
        <Grid columns={3} gap={[5,15]} style={{
          backgroundColor:"green",
          padding:15,
          borderWidth:5,
          borderColor:'blue'
        }}>
          {list.map((item,index)=>{
            return <Grid.Item key={index}>
              <View style={styles.item}><Text>{index}</Text></View>
            </Grid.Item>
          })}
        </Grid>
      </DemoBlock>
      <DemoBlock title='基础用法'>
        <Grid columns={5} gap={10}>
          <Grid.Item>
            <View style={styles.item}><Text>A</Text></View>
          </Grid.Item>
          <Grid.Item>
            <View style={styles.item}><Text>A</Text></View>
          </Grid.Item>
          <Grid.Item>
            <View style={styles.item}><Text>A</Text></View>
          </Grid.Item>
          <Grid.Item>
            <View style={styles.item}><Text>A</Text></View>
          </Grid.Item>
          <Grid.Item>
            <View style={styles.item}><Text>A</Text></View>
          </Grid.Item>
        </Grid>
      </DemoBlock>
      <DemoBlock title='基础用法'>
        <Grid columns={8} gap={20}>
          <Grid.Item>
            <View style={styles.item}><Text>A</Text></View>
          </Grid.Item>
          <Grid.Item>
            <View style={styles.item}><Text>A</Text></View>
          </Grid.Item>
          <Grid.Item>
            <View style={styles.item}><Text>A</Text></View>
          </Grid.Item>
          <Grid.Item>
            <View style={styles.item}><Text>A</Text></View>
          </Grid.Item>
          <Grid.Item>
            <View style={styles.item}><Text>A</Text></View>
          </Grid.Item>
          <Grid.Item>
            <View style={styles.item}><Text>A</Text></View>
          </Grid.Item>
          <Grid.Item>
            <View style={styles.item}><Text>A</Text></View>
          </Grid.Item>
          <Grid.Item>
            <View style={styles.item}><Text>A</Text></View>
          </Grid.Item>
          <Grid.Item>
            <View style={styles.item}><Text>A</Text></View>
          </Grid.Item>
        </Grid>
      </DemoBlock>
    </>
  )
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#F8F8F8",
    justifyContent: 'center',
    alignItems: 'center',
    height:30,
  }
})
