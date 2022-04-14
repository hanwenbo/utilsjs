import React from 'react';
import {View, ViewProps} from 'react-native-web';

export interface FlexProps
  extends Partial<Pick<ViewProps,
    | 'style'>> {
  children: React.ReactNode;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  flex?: number | null
}

export const Flex = ({
                       direction = 'row',
                       wrap = 'nowrap',
                       justify = 'start',
                       align = 'center',
                       flex = null,
                       style = {},
                       ...props
                     }: FlexProps) => {
  // TODO style如果为create 需要摊平
  const transferConst = [justify, align]
  const transferConstStyle = transferConst.map((el) => {
    let tempTxt
    switch (el) {
      case 'start':
        tempTxt = 'flex-start'
        break
      case 'end':
        tempTxt = 'flex-end'
        break
      case 'between':
        tempTxt = 'space-between'
        break
      case 'around':
        tempTxt = 'space-around'
        break
      default:
        tempTxt = el
        break
    }

    return tempTxt
  })
  const flexStyle: any = {
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent: transferConstStyle[0],
    alignItems: transferConstStyle[1],
    flex
  }

  return <View
    style={{
      flexDirection: "row",
      ...flexStyle,
      ...style
    }}
    {...props}
  />
};
