export type RequestType = (data?: {}, sorter?: {}, filter?: {}) => Promise<{ code: number; msg: string; result: any }>;
export const DefaultResponseFunction  = async (_: any) => {
  return {
    code:999,
    msg:'',
    result:null
  }
}
