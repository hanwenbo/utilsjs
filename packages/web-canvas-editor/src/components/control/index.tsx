import React from "react";
import {TextControl} from "../view/text";
import {ImageControl} from "../view/image";
import {HotAreaControl} from "../view/hotArea";
import {ItemProps} from "../../types"
import {ProFormInstance} from "@ant-design/pro-components";
import {Modal} from "antd"

type Props = {
  current: ItemProps
  onItemChange: (e: ItemProps) => void
  renderTextVariableControl?: (_: ProFormInstance | any) => React.ReactElement
  renderLinkActionControl?: () => React.ReactElement
  renderImageControl?: () => React.ReactElement
  onDelete?: () => void
}
export default (p: Props) => {
  const defaultProps = {
    onItemChange: (_: ItemProps) => {
    },
    renderImageControl: () => <></>,
    renderLinkActionControl: () => <></>,
    renderTextVariableControl: (_: ProFormInstance | any) => <></>,
    onDelete: () => {
    }
  }
  const props = {...defaultProps, ...p}
  const elementKeys = {
    "text": TextControl,
    "image": ImageControl,
    "hotArea": HotAreaControl,
  }
  const {renderLinkActionControl, renderTextVariableControl,renderImageControl} = props
  const {type, ...subProps} = props.current

  const onDelete = () => {
    Modal.confirm({
      title: "确认删除?",
      okText: "确认",
      okType: "danger",
      cancelText: "取消",
      onOk: props.onDelete
    });
  }

  return <div>
    <a onClick={onDelete}>删除</a>
    {!!elementKeys[props.current.type] ? React.createElement(elementKeys[type], {
      renderLinkActionControl,
      ...(type === "text" ? {renderTextVariableControl} : {}),
      ...(type === "image" ? {renderImageControl} : {}),
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
