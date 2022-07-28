import React from "react";
import { TextControl} from "../view/text";
import { ImageControl} from "../view/image";
import { HotAreaControl} from "../view/hotArea";
import {ItemProps} from "../../types"
type Props = {
  index: number
  item:ItemProps
  onItemChange:(e:{index: number, item: ItemProps}) => void
}
export default (p:Props)=>{
  const defaultProps = {
    index:0,
  }
  const props = {...defaultProps, ...p}
  const elementKeys = {
    "text": TextControl,
    "image": ImageControl,
    "hotArea": HotAreaControl,

  }
  const {type, ...subProps} = props.item
  return <div>
    {!!elementKeys[props.item.type] ? React.createElement(elementKeys[type], {
      values:{
        ...subProps
      }
    }) : <div>不存在的组件</div>}
  </div>
}
