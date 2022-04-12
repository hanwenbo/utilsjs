import {mergeProps} from '../../utils/with-default-props'
import React, {useState, FC} from 'react'
import {NativeProps, withNativeProps} from '../../utils/native-props'
// @ts-ignore
import {StyleSheet, View} from "react-native-web";

export type GridProps = {
  columns: number
  gap?: number | [number, number]
} & NativeProps

export const Grid: FC<GridProps> = ({children, style = {}, columns, ...props}) => {
  const {gap} = props
  let gapX = 0
  let gapY = 0
  if (gap !== undefined) {
    if (Array.isArray(gap)) {
      gapX = gap[0]
      gapY = gap[1]
      style['marginHorizontal'] = gap[0]
      style['marginVertical'] = gap[1]
    } else {
      gapX = gap
      gapY = gap
      style['margin'] = gap
    }
  }
  const [wrapWidth, setWrapWidth] = useState<number>(0);

  const childrenCount = React.Children.count(children)
  const rightEdgeItemStyle = {marginRight: 0}
  const bottomEdgeItemStyle = {marginBottom: 0}

  const flatStyle = StyleSheet.flatten([styles.main, style])

  // TODO 如果想实现 span功能 需要遍历所有的子元素，获得每个子元素的span属性，然后计算出每个子元素的宽度，然后计算出每个子元素的宽度 用View包裹 每行算一层
  return withNativeProps(
    props,
    <View
      style={[styles.main, style]}
    >
      <View
        style={[styles.wrap]}
        onLayout={({nativeEvent: {layout: {width}}}) => {
          setWrapWidth(width)
        }}
      >
        {React.Children.map(children, (child, index) => {
          const isRightEdge = (index + 1) % columns === 0
          const isBottomEdge = (childrenCount - index + 1) <= columns
          const gapWidth = (gapX * (columns - 1))
          let itemStyles = [styles.item, {marginRight: gapX, marginBottom: gapY, zIndex: "initial"}]
          let itemWidth = (wrapWidth - gapWidth) / columns

          if (wrapWidth) {
            itemWidth = Math.floor(itemWidth)
            itemStyles.push({width: itemWidth})
          }

          if (isRightEdge) {
            itemStyles.push(rightEdgeItemStyle)
            itemStyles.push({flex: 'auto'})
          }

          if (isBottomEdge) {
            itemStyles.push(bottomEdgeItemStyle)
          }

          return (
            child !== null &&
            child !== undefined && (
              <View style={[itemStyles,]}>{child}</View>
            )
          )
        })}
      </View>
    </View>
  )
}

export type GridItemProps = {} & NativeProps

export const GridItem: FC<GridItemProps> = p => {
  const props = mergeProps({span: 1}, p)

  return withNativeProps(
    props,
    <View
      style={styles.item}
    >
      {props.children}
    </View>
  )
}
const styles = StyleSheet.create({
  main: {},
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {}
})
