# TextInput 输入框


参考
https://reactnative.cn/docs/textinput


TextInput 是一个允许用户在应用中通过键盘输入文本的基本组件。本组件的属性提供了多种特性的配置，譬如自动完成、自动大小写、占位文字，以及多种不同的键盘类型（如纯数字键盘）等等。

最简单的用法就是丢一个TextInput到应用里，然后订阅它的onChangeText事件来读取用户的输入。注意，从 TextInput 里取值这就是目前唯一的做法！也就是使用在onChangeText中用setState把用户的输入写入到 state 中，然后在需要取值的地方从 this.state 中取出值。它还有一些其它的事件，譬如onSubmitEditing和onFocus。一个简单的例子如下：

<code src="./demos/demo1.tsx"></code>

Two methods exposed via the native element are .focus() and .blur() that will focus or blur the TextInput programmatically.

注意有些属性仅在multiline为 true 或者为 false 的时候有效。此外，当multiline=false时，为元素的某一个边添加边框样式（例如：borderBottomColor，borderLeftWidth等）将不会生效。为了能够实现效果你可以使用一个View来包裹TextInput：
<code src="./demos/demo2.tsx"></code>

TextInput在安卓上默认有一个底边框，同时会有一些 padding。如果要想使其看起来和 iOS 上尽量一致，则需要设置padding: 0。

又又，在安卓上长按选择文本会导致windowSoftInputMode设置变为adjustResize，这样可能导致绝对定位的元素被键盘给顶起来。要解决这一问题你需要在 AndroidManifest.xml 中明确指定合适的windowSoftInputMode( https://developer.android.com/guide/topics/manifest/activity-element.html )值，或是自己监听事件来处理布局变化。
