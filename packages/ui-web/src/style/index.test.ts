// import Modifier from './modifiers';
import Typography from "./typography"
describe('style/index', () => {
  it('属性', () => {
    Typography.loadTypographies({
      h1:{
        color:"#fff",
      }
    })
    expect(Typography['h1']['color']==='#fff').toEqual(true);
  });
});
