import {FormBeta, onRequest, onFinish} from './form-beta'
import {attachPropertiesToComponent} from "../../utils/attach-properties-to-component";

export type {FormBetaProps} from './form-beta'

export default attachPropertiesToComponent(FormBeta, {
  onRequest,
  onFinish,
})
