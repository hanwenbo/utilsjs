
// TODO 老代码即将废弃
// @ts-ignore
export const getTableListColumns = ({columns, module, columnsMap}) => {
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
