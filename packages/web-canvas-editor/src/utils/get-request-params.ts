// TODO 老代码即将废弃
// @ts-ignore
export const getRequestParams = ({params, sorter = {}, filter: _ = {}}) => {
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
