import Arr from '.';

describe('Arr', () => {
  it('在数组里', () => {
    expect(Arr.inArray(1, [1, 2, 3])).toEqual(true);
  });
  it('在多个数组里', () => {
    expect(Arr.inArrayMulti([1, 2], [1, 23, 2])).toEqual(true);
  });
  it('删除', () => {
    expect(Arr.del(1, [1, 2])).toEqual([2]);
  });
  it('根据字段删除', () => {
    expect(Arr.delByField(1, 'id', [
      {id: 1}, {id: 2}
    ])).toEqual([{id: 2}]);
  });

  it('根据字段去重复', () => {
    expect(Arr.uniqueByField([{id: 1}, {id: 2}, {id: 2}], 'id')).toEqual([{id: 1}, {id: 2}]);
  });

  it('反选', () => {
    expect(Arr.toggle(1, [1, 2])).toEqual([2]);
  });
  it('合并', () => {
    expect(Arr.merge([1], [2])).toEqual([1, 2]);
  });

  it('树形结构', () => {
    const res = Arr.toTree([
      {id: 1, pid: 0},
      {id: 2, pid: 1},
      {id: 3, pid: 1},
    ])
    // @ts-ignore
    expect(res[0].children.length).toEqual(2);
  });
  it('树形结构填充', () => {
    const res = Arr.toTreeFillChildren([
      {id: 1, pid: 0},
      {id: 2, pid: 0},
      {id: 3, pid: 0},
    ])
    const check = typeof res[0]['children'] !== "undefined" && typeof res[1]['children'] !== "undefined" && typeof res[2]['children'] !== "undefined"
    // @ts-ignore
    expect(check).toEqual(true);
  });

  it('根据索引删除', () => {
    expect(Arr.removeByIndex([1, 2], 0)).toEqual([2]);
  });

  it('正反选，根据字段', () => {
    expect(Arr.toggleByField({id: 1}, 'id', [
      {id: 1},
      {id: 2}
    ])).toEqual([{id: 2}]);
  });

});
