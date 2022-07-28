// TODO 老代码即将废弃
// 当null 是过滤掉所有
export const filterDefaultRender = ({
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
