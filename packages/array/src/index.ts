// @ts-ignore
import arrayToTree from "smart-arraytotree";

const inArray = (value: string | number, arr: (string[] | number[])): boolean => {
  // @ts-ignore
  return (arr.indexOf(value) > -1)
}

const inArrayMulti = (values: string[] | number[], arr: string[] | number[]): boolean => {
  let result = false
  values.map((value) => {
    if (inArray(value, arr)) {
      result = true
    }
  })
  return result;
}


const del = (value: string | number, arr: string[] | number[]): any[] => {
  for (var i = 0; i < arr.length; i++) {
    if (value === arr[i]) {
      arr.splice(i, 1);
    }
  }
  return arr
}


const delByField = (value: string | number, column: string, arr: object[]): any[] => {
  let result: any[] = []
  arr.map((item) => {
    if (item[column] !== value) {
      result.push(item)
    }
  })
  return result;
}


const uniqueByField = (arr: object[], column: string): object[] => {
  let _arr = arr.concat()
  let hash = [];
  let result = []
  for (var i = 0; i < _arr.length; i++) {
    if (hash.indexOf(_arr[i][column]) === -1) {
      hash.push(_arr[i][column]);
      result.push(_arr[i])
    }
  }
  return result;
}


const toggle = (value: string | number, arr: string[] | number[]) => {
  let _arr = [...arr]
  if (inArray(value, arr)) {
    _arr = del(value, arr)
  } else {
    _arr.push(value)
  }
  return _arr
}


const unique = (arr: string[] | number[]): any[] => {
  var hash = [];
  for (var i = 0; i < arr.length; i++) {
    if (hash.indexOf(arr[i]) === -1) {
      hash.push(arr[i]);
    }
  }
  return hash;
}


const merge = (arr1: [number], arr2: [number]): any[] => {
  for (var i = 0; i < arr2.length; i++) {
    arr1.push(arr2[i]);
  }
  return arr1;
}

const toTree = (list: object[], options = {
  id: "id",
  pid: "pid",
  firstPid: 0,
  children: "children"
}): object[] => {
  const res = arrayToTree(list, options)
  return Array.isArray(res) ? res : []
}

/**
 * 补全tree结构的children
 * 方便在需要必须每级都包含children的时候使用
 */
const toTreeFillChildren = (list: object[], options = {
  id: "id",
  pid: "pid",
  firstPid: 0,
  children: "children"
}): object[] => {
  list.map(function (item, index) {
    list[index]["children"] = [];
  });
  const res = arrayToTree(list, options)
  return Array.isArray(res) ? res : []
}

/**
 * 根据索引删除
 * @param arr
 * @param index
 */
const removeByIndex = (arr: any[], index: number): any[] => {
  arr.splice(index, 1);
  return arr
}

/**
 * 正反选，根据字段
 */
const toggleByField = (row: object, field: string, arr: object[]): object[] => {
  let _arr = [...arr]
  let find = false
  _arr.map((item, index) => {
    if (item[field] === row[field]) {
      find = true
      _arr.splice(index, 1);
    }
  })
  if (!find) {
    _arr.push(row)
  }
  return _arr
}

export default {
  inArray,
  inArrayMulti,
  del,
  delByField,
  uniqueByField,
  toggle,
  unique,
  merge,
  toTree,
  toTreeFillChildren,
  removeByIndex,
  toggleByField
}
