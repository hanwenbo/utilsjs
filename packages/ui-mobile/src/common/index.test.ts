import  {extractTypographyValue,extractColorValue} from './modifiers';
import Typography from "../style/typography"
import Color from "../style/color"
describe('common', () => {
  it('common/modifiers.extractTypographyValue', () => {
    // 给字体定义样式
    Typography.loadTypographies({
      h1:{
        color:"#fff",
      },
    })
    const style = extractTypographyValue({
      h1:true,
      h2:true
    })
    const res = JSON.stringify(style)===JSON.stringify({color:"#fff"})
    expect(res).toEqual(true);

  });
  it('common/modifiers.extractColorValue', () => {
    // 给字体定义样式
    Color.loadColors({
      white:"#FFFFFF",
    })
    const color = extractColorValue({
      white:true,
      h2:true
    })

    const res = color === "#FFFFFF";
    expect(res).toEqual(true);
  });
});
