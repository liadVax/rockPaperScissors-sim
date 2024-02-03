import { Component, Show } from "solid-js";

const WinningModal: Component<{
  isOpen: boolean;
  text: string | undefined;
}> = (props) => {
  return (
    <Show when={props.isOpen && props.text !== undefined} fallback={null}>
      <div
        style={`
          position: fixed;
          width:200px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 20px;
          background-color: white;
          border: 1px solid #ccc;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          z-index: 1000;
          border:6px ridge black;
          background: rgb(240,128,128);
          background: linear-gradient(270deg, rgba(240,128,128,1) 0%,
          rgba(255,250,205,1) 50%,
          rgba(144,238,144,1) 100%);
        `}
      >
        <div>
          <p style={`text-align:center;font-weight:bold;font-size:22px;word-spacing:2px`}>
            {props.text}
            <br />
            EPIC Winner!
          </p>
        </div>
      </div>
    </Show>
  );
};

export default WinningModal;
