import Obj from '.';

describe('Obj', () => {
  it('循环', () => {
    let  obj = {
      1:'ok'
    }
    let ok = false
    Obj.forEach(obj ,(key,value)=>{
      if(key === "1" && value === 'ok'){
        ok = true
      }
    })
    expect(ok).toEqual(true);
  });
});
