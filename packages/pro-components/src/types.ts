export type RequestType = (data?: {}) => Promise<{
  code: number,
  msg: string,
  result: any[] | any
}>;
export const DefaultResponseFunction  = async (_: any) => {
  return {
    code:999,
    msg:'',
    result:null
  }
}
