// @ts-ignore
import {Text} from "react-native-web";
import React from "react"
import {ViewProps} from "react-native-web/exports/View/types";

const ViewTextAuto = ({children, ...props}: ViewProps) => {
  if (typeof children === 'string') {
    // @ts-ignore
    return <Text {...props}>{children}</Text>
  } else {
    return typeof children !== "undefined" ? children : null
  }
}
export {ViewTextAuto};
export default ViewTextAuto
