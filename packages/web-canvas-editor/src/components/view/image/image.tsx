import React from "react"
import {ElementStyleProps, LinkActionType} from "../../../types";

type Props = {
  style: ElementStyleProps & {}
  isBackground?: boolean
  src?: string
  link?: LinkActionType
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
    isBackground: false,
    src: '',
  }
  const props = {...defaultProps, ...p}
  return <img className="image" style={props.style} alt="" src={props.src} />
}
