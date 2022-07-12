import React, {useRef} from 'react';
import {message, Button} from 'antd';
import {BetaSchemaForm} from '@ant-design/pro-components';
import type {ProFormInstance, ProColumns} from '@ant-design/pro-components';
import {schemaFormColumnsFormat} from "../../../ui/schemaForm";
import type {Callbacks} from "rc-field-form/es/interface";
import {RequestType} from "../../../types";

type DataItem = {
  name: string;
  state: string;
};


type Props = {
  params?:any,
  columns: ProColumns<any>[]
  addService:RequestType
  onSuccess: Function
  onValuesChange?: Callbacks<any>['onValuesChange']
}
export default (props: Props) => {
  const {
    params ={},
    columns,
    addService,
    onSuccess,
    onValuesChange = () => {
    },
  } = props || {}
  const formRef = useRef<ProFormInstance>();

  const _columns = [
    ...schemaFormColumnsFormat(columns)
  ]

  const onFinish = async (values: any) => {
    const res = await addService({
      ...params,
      ...values
    })
    if (res.code === 0) {
      formRef.current?.resetFields()
      onSuccess && onSuccess()
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
    trigger={<Button type={'primary'}>添加</Button>}
    layoutType="DrawerForm"
    onFinish={onFinish}
    columns={_columns}
  />
}


