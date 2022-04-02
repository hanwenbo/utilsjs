import _ from '@hanwenbo/object';

export class View {

  /**
   * Load custom set of view
   * arguments:
   * view - map of keys and typography values
   * e.g {text15: {fontSize: 58, fontWeight: '100', lineHeight: Math.floor(58 * 1.4)}}
   */
  loadView(view: any) {
    _.forEach(view, (key, value) => {
      this[key] = value;
    });
  }

}
const view = new View();

export default view;
