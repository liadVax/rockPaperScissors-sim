import { Component, JSXElement } from "solid-js";

const Canvas: Component<{
  children: JSXElement;
  width: number;
  height: number;
}> = (props) => {
  return (
    <div
      style={`width:${props.width}px;
              height:${props.height}px;
              border:6px ridge black;
              background: rgb(255,255,255);
              background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(213,232,255,1) 100%);
              position:relative;`}
    >
      {props.children}
    </div>
  );
};
export default Canvas;
