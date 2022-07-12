import React, {useState, useRef} from 'react';
import {message} from 'antd';
import {BetaSchemaForm} from '@ant-design/pro-components';
import type {ProFormInstance} from '@ant-design/pro-components';
import {schemaFormColumnsFormat} from "../../../ui/schemaForm";
import {RequestType, DefaultResponseFunction} from "../../../types";

type DataItem = {
  name: string;
  state: string;
};
type Props = {
  params: any;
  info: any;
  columns: any[];
  infoService: RequestType;
  editService: RequestType;
  onSuccess?: () => void;
  onValuesChange?: (values: any) => void;
}
export default (props: Props) => {
  const {
    params = {},
    info: _info,
    columns,
    infoService = DefaultResponseFunction,
    editService = DefaultResponseFunction,
    onSuccess = () => {
    },
    onValuesChange = () => {
    },
  } = props || {}
  const [info, setInfo] = useState<any>(null);

  const formRef = useRef<ProFormInstance>();

  const _columns = [
    ...schemaFormColumnsFormat(columns)
  ]

  const fetchInfo = async () => {
    const res = await infoService({id: _info.id})
    if (res.code === 0) {
      setInfo(res.result)
      formRef?.current?.setFieldsValue(res.result)
    }
  }

  const onFinish = async (values: any) => {
    const res = await editService({...params, id: info?.id, ...values})
    if (res.code === 0) {
      formRef.current?.resetFields()
      onSuccess?.()
      message.success(res.msg)
      return true
    } else {
      message.error(res.msg)
      return false
    }
  }
  return <BetaSchemaForm<DataItem>
    formRef={formRef}
    onValuesChange={onValuesChange}
    trigger={<a onClick={fetchInfo}>修改</a>}
    layoutType="DrawerForm"
    onFinish={onFinish}
    columns={_columns}
  />
}


