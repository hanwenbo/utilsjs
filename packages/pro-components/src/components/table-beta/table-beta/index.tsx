import React, {useRef} from 'react'
import {TableList} from "../table-list";
import {getRequestParams} from "../../../utils/get-request-params"
import AddModal from "../add-modal"
import EditModal from "../edit-modal"
import DelModal from "../del-modal"
import ImportModal from "../import-modal"
import {tableSearch} from "../export-modal"
import DetailModel from "../detail-modal"

import {Space} from "antd";
import {ProFormInstance, ProTableProps} from '@ant-design/pro-components';
import type {ProColumns} from '@ant-design/pro-components';
import {RequestType, DefaultResponseFunction} from "../../../types";

interface importTemplate {
  url?: string,
  text?: string,
  tips?: []
}

interface PropsType {
  columns: ProColumns<any>[] | any[],
  exportName?: string,
  importExcel?: {
    template: importTemplate
  } | null,
  exportExcel?: {
    name: string
    background?: boolean
  } | null,
  actions: {
    add?: boolean,
    edit?: boolean,
    del?: boolean,
    detail?: boolean
  },
  headerTitleBefore?: any,
  headerTitleAfter?: any,
  addParams?: Object,
  editParams?: Object,
  service?: {
    add?: RequestType;
    edit?: RequestType;
    del?: RequestType;
    info?: RequestType;
    list?: RequestType;
    importExcelAction?: string
  },
  onResponse?: Function,
  renderBefore?: Function,
  renderAfter?: Function
}

export default (
  {
    formRef,
    columns = [],
    actionRef,
    importExcel = null,
    // title = '表格',
    exportExcel = null,
    actions = {
      add: false,
      edit: false,
      del: false,
      detail: false,
    },
    onResponse = (_: any) => {
    },
    headerTitleBefore = null,
    headerTitleAfter = null,
    addParams = {},
    editParams = {},
    service = {
      add: DefaultResponseFunction,
      edit: DefaultResponseFunction,
      del: DefaultResponseFunction,
      info: DefaultResponseFunction,
      list: DefaultResponseFunction,
      importExcelAction: ""
    },
    ...props
  }: PropsType & ProTableProps<any, any>
) => {

  if (!formRef) {
    formRef = useRef<ProFormInstance>()
  }

  const onSuccess = () => {
    // @ts-ignore
    actionRef.current?.reloadAndRest?.();
  }
  let extraProps = {}

  // 开启导出或定义了名字
  if (!!exportExcel?.name) {
    extraProps['search'] = tableSearch({
      getList: service.list ?? DefaultResponseFunction,
      exportName: exportExcel?.name,
      exportBackground: !!exportExcel?.background,
      formRef
    })
  }
  if (actions?.add || !!importExcel || !!headerTitleBefore || !!headerTitleAfter) {
    // @ts-ignore
    extraProps['headerTitle'] = <Space>
      {headerTitleBefore}
      {!!actions?.add && typeof service.add === "function" && <AddModal
        params={addParams}
        columns={columns}
        addService={service.add}
        onSuccess={onSuccess}
      />}
      {!!importExcel && <ImportModal
        action={service?.importExcelAction}
        template={importExcel?.template}
        onSuccess={onSuccess}
      />}
      {headerTitleAfter}
    </Space>
  }
  if (actions?.edit || actions?.del || actions?.detail) {
    let endIndex = columns.length - 1
    let columnsEnd = columns[endIndex]

    // @ts-ignore
    if (columnsEnd?.valueType === 'option') {
      columns[endIndex] = {
        ...columnsEnd,
        render: (dom: any, entity: any) => {
          return <Space>
            {columnsEnd?.renderBefore && columnsEnd?.renderBefore(dom, entity)}
            {actions?.edit && <EditModal
              params={editParams}
              columns={columns}
              info={entity}
              infoService={service.info ?? DefaultResponseFunction}
              editService={service.edit ?? DefaultResponseFunction}
              onSuccess={onSuccess}
            />}
            {actions?.del && <DelModal
              delService={service.del ?? DefaultResponseFunction}
              info={entity}
              onSuccess={onSuccess}
            />}
            {actions?.detail && <DetailModel
              info={entity}
              columns={columns}
              onSuccess={onSuccess}
            />}
            {columnsEnd?.renderAfter && columnsEnd?.renderAfter(dom, entity)}
          </Space>;
        },
      }
    }
  }

  return <TableList
    {...extraProps}
    actionRef={actionRef}
    formRef={formRef}
    service={async (params: any, sorter: any, filter: any) => {
      const payload = getRequestParams({params, sorter, filter})
      const res = await service?.list?.(payload);
      onResponse && onResponse(res)
      return res

    }}
    columns={columns}
    {...props}
  />
}
