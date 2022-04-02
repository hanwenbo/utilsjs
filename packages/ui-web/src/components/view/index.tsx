// @ts-ignore
import {View as RNView} from "react-native-web";
import React, {forwardRef, Ref} from "react"
import {extractViewValue} from "../../common/modifiers"
import {ViewProps} from "react-native-web/exports/View/types";


const View = ({style, ...props}: ViewProps,ref: Ref<any>) => {
  const _style = {...style, ...extractViewValue(props)}
  return <RNView {...props} style={_style} ref={ref} />
}
export {View}; // For tests
export default forwardRef(View)
