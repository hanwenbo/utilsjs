import React from "react";
import {TextControl} from "../view/text";
import {ImageControl} from "../view/image";
import {HotAreaControl} from "../view/hotArea";
import {ItemProps} from "../../types"
import {ProFormInstance} from "@ant-design/pro-components";

type Props = {
  current: ItemProps
  onItemChange: (e: ItemProps) => void
  renderTextVariableControl?: (_: ProFormInstance | any) => React.ReactElement
  renderLinkActionControl?: () => React.ReactElement
}
export default (p: Props) => {
  const defaultProps = {
    onItemChange: (_: ItemProps) => {
    },
    renderLinkActionControl: () => <></>,
    renderTextVariableControl: (_: ProFormInstance | any) => <></>,
  }
  const props = {...defaultProps, ...p}
  const elementKeys = {
    "text": TextControl,
    "image": ImageControl,
    "hotArea": HotAreaControl,
  }
  const {renderLinkActionControl, renderTextVariableControl} = props
  const {type, ...subProps} = props.current

  return <div>
    {!!elementKeys[props.current.type] ? React.createElement(elementKeys[type], {
      renderLinkActionControl,
      ...(type === "text" ? {renderTextVariableControl} : {}),
      onValuesChange: (values) => {
        props.onItemChange({
          ...props.current,
          ...values
        })
      },
      values: {
        ...subProps
      },
    }) : <div>不存在的组件</div>}
  </div>
}
