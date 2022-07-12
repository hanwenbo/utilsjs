import React from "react"

export const schemaFormColumnsFormat = (columns: any[],overrideColumns:any[] = []) => {
  let overKeys = {}
  overrideColumns.map((item)=>{
    // @ts-ignore
    overKeys[item.dataIndex] = item
  })
  return Array.isArray(columns) ? columns.map((item) => {
    if (item?.formWidth) {
      item['width'] = item?.formWidth
    }
    // @ts-ignore
    if(overKeys[item.dataIndex]){
      // @ts-ignore
      item = Object.assign(item,overKeys[item.dataIndex])
    }
    return item
  }) : []
}


