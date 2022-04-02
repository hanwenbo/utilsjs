import _ from '@hanwenbo/object';

export class Typography {

  /**
   * Load custom set of typographies
   * arguments:
   * typographies - map of keys and typography values
   * e.g {text15: {fontSize: 58, fontWeight: '100', lineHeight: Math.floor(58 * 1.4)}}
   */
  loadTypographies(typographies: any) {
    _.forEach(typographies, (key, value) => {
      this[key] = value;
    });
  }

}
const typography = new Typography();

export default typography;
