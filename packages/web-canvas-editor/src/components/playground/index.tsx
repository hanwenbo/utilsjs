import React from "react"
import Tool from "../tool"
import View from "../view"
export default ()=>{
  return <div className={"web-canvas-editor"}>
    <div className={"playground"}>
      <div className={'tool'}>
        <Tool />
      </div>
      <div className={'view'}>
        <View />
      </div>
      <div className={'control'}>
      </div>
    </div>
  </div>
}
