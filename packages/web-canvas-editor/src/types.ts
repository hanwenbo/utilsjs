export type ElementStyleProps = {
  zIndex?: number;
  left: number;
  top: number;
  width: number;
  height: number;
  fontWeight?:FontWeightType
  textAlign?: TextAlignType;
  lineHeight?:number
}
export type LinkActionType = {
  action?: string;
  params?: any;
}

export type FontWeightType = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
export type TextAlignType = 'left' | 'center' | 'right'

export type ItemType = "text"|"image"|"hotArea"
export type ItemProps = {
  type: ItemType;
  style: ElementStyleProps;
  children?: any;
  link?: LinkActionType;
}
