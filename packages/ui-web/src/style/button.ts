import _ from '@hanwenbo/object';

export class Button {

  textStyle = {}
  /**
   * Load custom set of attr
   * arguments:
   * button - map of keys and typography values
   * e.g {text15: {fontSize: 58, fontWeight: '100', lineHeight: Math.floor(58 * 1.4)}}
   */
  loadButton(attr: any) {
    _.forEach(attr, (key, value) => {
      this[key] = value;
    });
  }

  loadButtonText(attr: any) {
    _.forEach(attr, (key, value) => {
      this.textStyle[key] = value;
    });
  }

}
const button = new Button();

export default button;
