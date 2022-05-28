<h1 align="center">@hanwenbo/web-editor</h1>

> 网站编辑需要用到

## 📦 安装

```
// npm
npm install @hanwenbo/web-editor --save

// yarn
yarn add @hanwenbo/web-editor

```

## 🔨 使用



```tsx
import React, {useState, useRef} from 'react';
import EditorList from '@hanwenbo/web-editor';
import '@hanwenbo/web-editor/assets/index.less';
import './index.less';

const {ClassName, State, Layout, Font, BackGround, Border, Interface, Margin, Shadow, Transition, Css} = EditorList;


export default (props) => {
  const [editorDom, setEditorDom] = useState(null);
  const [state, setState] = useState('web');
  const editorRef = useRef(null);

  const onClick = (e) => {
    const dom = e.target;
    setEditorDom(dom);

  }

  const onChange = (e) => {
    console.warn(e);
  }

  const onSwicth = () => {
    setState(state === 'web' ? 'mobile' : 'web');
  }
  const closeEdit = () => {
    setEditorDom(null);
  }


  return (<div id="abc" className="box">
    <div className="editor-user-css">
      <div onClick={onClick} className="a c  tmain-editor_css">
        顶部
        <div onClick={onClick} className="a c jeply9mvwlk-editor_css">
          a<br />
          ---------请点击---------
        </div>
        <div onClick={onClick} className="a c" >
          bbbbb<br />
          ---------请点击---------
        </div>
      </div>
    </div>

    <button onClick={closeEdit}>关闭</button>
    <button onClick={onSwicth}>切换模式：{state}</button>

    {editorDom && (
      <EditorList
        style={{width: 280, margin: 50, position: 'absolute', top: 0, right: 0, zIndex: 1}}
        editorElem={editorDom}
        onChange={onChange}
        isMobile={state === 'mobile'}
        rootSelector="#abc"
        imageSelect={true}
        ref={editorRef}
        defaultActiveKey={["EditorBackGround", "EditorClassName", "EditorState", "EditorLayout", "EditorFont", "EditorInterface", 'Css']}

      >
        <ClassName />
        <State />
        <Layout />
        <Font />
        <BackGround />
        <Border />
        <Interface
          exclude={['position', 'float', 'opacity', 'width', 'height', 'overflow']}
        />
        <Css />
      </EditorList>)}
  </div>);

}

```

