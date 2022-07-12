import {ProTable} from '@ant-design/pro-components';
import React from 'react';
import styles from "./index.less"
import classNames from 'classnames';
import AddModal from "./add-modal"
import EditModal from "./edit-modal"
import DelModal from "./del-modal"
import ImportModal from "./import-modal"
import {tableSearch} from "./export-modal"
import TableBeta from "./table-beta";
import DetailModel from "./detail-modal"

const TableList = (props: any) => {
  const {service, paddingClear, ..._props} = props || {};
  const defaultProps = {
    rowKey: 'id',
    search: {labelWidth: 'auto'},
    scroll: {x: 2000}
  };

  let newObj = {};

  if (service) {
    // @ts-ignore
    newObj['request'] = async (params, sorter, filter) => {
      const res = await service(params, sorter, filter);
      return {
        data: res.result.list,
        success: true,
        total: res.result.total_number,
      };
    }
  }

  const style = classNames(styles.main, paddingClear ? styles.paddingFalse : null)
  return <>
    <div className={style}>
      <ProTable
        {...newObj}
        {...defaultProps}
        {..._props}
      />
    </div>
  </>;
};

export default TableList;

// TODO 老代码即将废弃
// @ts-ignore
const getTableListColumns = ({columns, module, columnsMap}) => {
  // 返回给列表
  return columns.map((item: { dataIndex: { join: (arg0: string) => any; indexOf: (arg0: string) => number; split: (arg0: string) => any; }; width: any; }) => {
    let dataIndex = Array.isArray(item.dataIndex) ? item.dataIndex.join('.') : item.dataIndex
    const fieldMap = columnsMap[`${module}.${dataIndex}`]
    const width = fieldMap?.width ? fieldMap?.width : (item?.width ? item?.width : 'auto');

    // 转新版antd数组dataIndex的格式
    if (!!item?.dataIndex && item?.dataIndex?.indexOf(".") > -1) {
      item.dataIndex = item.dataIndex.split(".")
      // if(!item?.key){
      //   item.key =`${module}.${item.dataIndex}`
      // }
    }
    // if(!item?.key){
    //   item.key =`${module}.${item.dataIndex}`
    // }
    // columnsMap文件里的字段如果存在.解为数组再覆盖 dataIndex ，antd格式
    if (fieldMap?.dataIndex && !Array.isArray(fieldMap?.dataIndex) && fieldMap?.dataIndex.indexOf(".") > -1) {
      fieldMap.dataIndex = fieldMap?.dataIndex.split(".")
    }

    const render = fieldMap?.render ? fieldMap?.render : null

    let res = {
      ...item,
      ...fieldMap,
      width,
    }
    if (render) {
      res['render'] = render
    }
    return res
  })
}
// TODO 老代码即将废弃
// @ts-ignore
const getRequestParams = ({params, sorter = {}, filter: _ = {}}) => {
  const {current, pageSize, ...fields} = params || {};
  // 过滤掉全部
  Object.keys(fields).map((key) => {
    if (fields[key] === 'all') {
      delete fields[key]
    }
  })

  let payload = {
    page: params?.current ?? 1,
    rows: params?.pageSize ?? 20,
    ...fields,
  };
  let sortby = ``
  Object.keys(sorter).forEach(function (key) {
    sortby = `${key} ${sorter[key]}`
  });
  if (sortby) {
    payload['sortby'] = sortby.replace(`ascend`, 'ASC').replace(`descend`, 'DESC')
  }
  return payload
}
// TODO 老代码即将废弃
// 当null 是过滤掉所有
const filterDefaultRender = ({
                               fields = null,
                               columns = [],
                               excludeFields = [],
                               deleteFields = [],
                               // 过滤掉hideInTable的字段
                               hideInTable = true,
                             }) => {
  let _columns = [...columns]
  let res: any[] = [];
  _columns.map((item: any) => {
    let _item = {...item}
    const {dataIndex} = _item || {}
    // 删除一些不需要的字段
    // @ts-ignore
    if (deleteFields.indexOf(dataIndex) > -1 || (hideInTable && item?.hideInTable)) {

    } else {
      // @ts-ignore
      if (!fields || fields.indexOf(dataIndex) > -1) {
        delete _item?.render
      }
      if (_item) {
        res.push(_item)
      }
    }

  })
  return res
}

export {
  getTableListColumns,
  getRequestParams,
  filterDefaultRender,
  tableSearch,
  AddModal,
  EditModal,
  DelModal,
  ImportModal,
  TableBeta,
  DetailModel
}
