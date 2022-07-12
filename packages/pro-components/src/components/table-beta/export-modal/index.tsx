import React from "react";
import {Button, message} from "antd";
import {getRequestParams} from "../";
import fileDownload from "js-file-download";
import {DefaultResponseFunction, RequestType} from "../../../types";
import type {ProFormInstance} from '@ant-design/pro-components';

export const onExport = async (
  {
    // formProps,
    getList,
    exportName,
    exportBackground,
    formRef,
    extraParams
  }: any
) => {
  let values = formRef?.current?.getFieldsFormatValue()
  const hide = message.loading('导出中', 0);
  const res = await getList(getRequestParams({
    params: {
      ...extraParams,
      ...values,
      is_output: 1,
      current: 1,
      pageSize: 2000,
    }
  }))
  setTimeout(hide, 0);
  console.warn('exportBackground', exportBackground)
  if (exportBackground) {
    // TODO 处理全局 is out Blob 的问题
    message.success("正在生成Excel文档，请稍后去CSV下载区查看")
  } else {
    try {
      fileDownload(res, `${exportName}.xlsx`);
    } catch (e) {
      message.error("未知错误");
    }
    if (typeof res === "object" && res.msg) {
      message.error(res.msg);
    }
  }
}

type TableSearchProps = {
  getList: RequestType;
  exportName: string;
  exportBackground: boolean;
  formRef?: ProFormInstance | any;
}
export const tableSearch = (
  {
    getList = DefaultResponseFunction,
    exportName = '导出列表',
    exportBackground = false,
    formRef,
  }: TableSearchProps
) => {
  return {
    defaultCollapsed: false,
    labelWidth: 'auto',
    optionRender: (searchConfig: any, formProps: any, dom: any[]) => [
      ...dom.reverse(),
      <Button
        key="out"
        onClick={async () => onExport({
          formProps,
          getList,
          exportName,
          exportBackground,
          formRef
        })}>导出</Button>,
    ],
  }
}
