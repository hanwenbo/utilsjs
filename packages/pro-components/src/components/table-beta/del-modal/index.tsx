import React from 'react';
import {message, Modal} from 'antd';
import {RequestType, DefaultResponseFunction} from "../../../types";

type Props = {
  info: any;
  delService: RequestType;
  onSuccess: () => void;
}
export default (props: Props) => {
  const {info: _info, delService = DefaultResponseFunction, onSuccess,} = props || {}

  const onDel = () => {
    Modal.confirm({
      title: "确认要删除吗？",
      okText: "确认",
      okType: "danger",
      cancelText: "取消",
      onOk: async () => {
        const res = await delService({
          ids: [_info?.id],
        })
        if (res.code === 0) {
          message.success("已删除");
          onSuccess && onSuccess()
        } else {
          message.error(res.msg);
        }
      }
    });
  }

  return <a onClick={onDel}>删除</a>
}


