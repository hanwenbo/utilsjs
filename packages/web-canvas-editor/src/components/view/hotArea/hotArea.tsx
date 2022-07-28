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
      width: 100,
      height: 100,
      zIndex: 0,
    },
  }
  const props = {...defaultProps, ...p}
  return <div className="hotArea" style={props.style}>{props.children}</div>
}
