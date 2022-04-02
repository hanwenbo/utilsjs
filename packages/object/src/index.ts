type Fun = (key: number|string, value:any)=>void
const forEach = (obj :Record<number|string, any> ,fun :Fun): void => {
  for(let key  in obj){
    // JS中object的key，传数字类型，会默认转化为string。
    fun(`${key}`,obj[`${key}`])
  }
}

export default {
  forEach,
}
