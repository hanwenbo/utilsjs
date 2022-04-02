// @ts-ignore
import {View as RNView} from "react-native-web";
import React, {forwardRef} from "react"
import {extractViewValue} from "../../common/modifiers"
import {GenericStyleProp} from "react-native-web/types";
import {ViewStyle} from "react-native-web/exports/View/types";

type PropsType = {
  style?: GenericStyleProp<ViewStyle>
}
const View = ({style, ...props}: PropsType) => {
  const _style = {...style, ...extractViewValue(props)}
  return <RNView {...props} style={_style} />
}
export {View}; // For tests
export default forwardRef(View)
