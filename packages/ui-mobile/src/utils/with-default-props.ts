import merge from "deepmerge"

export function mergeProps<A, B>(a: A, b: B): B & A
export function mergeProps<A, B, C>(a: A, b: B, c: C): C & B & A
export function mergeProps(...items: any[]) : { [key: string]: any } {
  let props = {}
  items.map((item) => {
    props = merge(props, item)
  })
  return props
}
