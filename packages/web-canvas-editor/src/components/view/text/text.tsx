import React from "react"
import {ElementStyleProps} from "../../../types";

type Props = {
  style: ElementStyleProps & {}
  children: React.ReactNode
}
export default (p: Props) => {
  const defaultProps = {
    style: {
      left: 0,
      top: 0,
      width: 80,
      height: 16,
      zIndex: 0,
      fontSize: 14,
      fontWeight: 'normal',
      textAlign: "left",
      lineHeight: 16,
    },
    children: "文字"
  }
  const props = {...defaultProps, ...p}
  return <span className="text" style={props.style}>{props.children}</span>
}
