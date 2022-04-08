import {Image as RNImage} from "react-native-web";
import React from "react"
import {extractStyle} from "../../common/modifiers"
import {ImageProps as RNImageProps} from "react-native-web/exports/Image/types";

export type ImageProps = {
  [key: string]: boolean,
} & RNImageProps

const Image = ({style = {}, ...props}: ImageProps) => {
  const _style = extractStyle('Image', props)
  return <RNImage {...props} style={[style, _style]} />
}
export {Image};
export default Image
