import React from "react";
import { TextControl} from "../view/text";
import { ImageControl} from "../view/image";
import { HotAreaControl} from "../view/hotArea";
import {ItemProps} from "../../types"
type Props = {
  current: ItemProps
  onItemChange:(e:ItemProps) => void
}
export default (p:Props)=>{
  const defaultProps = {
    onItemChange: (_:ItemProps) => {}
  }
  const props = {...defaultProps, ...p}
  const elementKeys = {
    "text": TextControl,
    "image": ImageControl,
    "hotArea": HotAreaControl,
  }
  const {type, ...subProps} = props.current

  return <div>
    {!!elementKeys[props.current.type] ? React.createElement(elementKeys[type], {
      onValuesChange:(values)=>{
        props.onItemChange({
          ...props.current,
          ...values
        })
      },
      values:{
        ...subProps
      },
    }) : <div>不存在的组件</div>}
  </div>
}
