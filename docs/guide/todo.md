- [ ] 禁止定义样式的时候使用大写开头的attr，因为在获得theme的时候是根据key首字母的大小写来决定是否为属子元素的props
- [ ] StyleSheet 从库里导出
- 最终所有的项目开发  所有的接口都从该库导出

在grid的里面用 ui web里的view 添加样式无效

const flatStyle = StyleSheet.flatten([styles.main, style])
尝试这个方法获得样式  再给 react native web 里的view
