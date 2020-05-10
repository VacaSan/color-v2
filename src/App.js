/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import { parseToRgb, readableColor, toColorString } from "polished";
import * as colours from "./colours";

const white = {
  red: 255,
  green: 255,
  blue: 255,
};

function App() {
  const [color, setColor] = React.useState(white);

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} evt
   */
  const onChange = evt => {
    try {
      const nextColor = parseToRgb(evt.target.value);
      setColor(nextColor);
    } catch (_) {
      // well, do nothing i guess...
    }
  };

  const backgroundColor = toColorString(color);
  const textColor = readableColor(backgroundColor, "rgba(0,0,0,0.87)", "white");

  React.useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = textColor;
  }, [backgroundColor, textColor]);

  return (
    <React.Fragment>
      <h1
        css={css`
          position: fixed;
          top: 1rem;
          left: 1rem;
          font-size: 32px;
          margin: 0;
        `}
      >
        <span role="img" aria-label="unicorn">
          🦄
        </span>{" "}
        colours.
      </h1>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          width: 100vw;
          height: 100vh;
          padding: 0 1rem;
        `}
      >
        <div>
          <ColorInput onChange={onChange} />
          <ColorNotations color={color} />
        </div>
      </div>
    </React.Fragment>
  );
}

/**
 * @param {object} props
 * @param {(evt: React.ChangeEvent<HTMLInputElement>) => any} props.onChange
 */
function ColorInput({ onChange }) {
  return (
    <div
      css={css`
        position: relative;
      `}
    >
      <label
        htmlFor="color"
        css={css`
          position: absolute;
          border: 0;
          clip: rect(0 0 0 0);
          height: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          width: 1px;
        `}
      >
        Color:
      </label>
      <input
        type="text"
        id="color"
        onChange={onChange}
        placeholder="hex/rgb(a)/hsl(a)"
        css={css`
          display: block;
          width: 100%;
          min-width: 24ch;
          height: 48px;
          color: inherit;
          font-size: 1.5rem;
          background: none;
          border: 0;
          border-bottom: 1px solid currentColor;
          outline: none;
        `}
      />
      <div
        css={css`
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: currentColor;
          transform-origin: center bottom;
          transform: scale(0);
          transition: transform 120ms;
          input:focus + & {
            transform: scale(1);
          }
        `}
      />
    </div>
  );
}

/**
 * @param {object} props
 * @param {import("./colours").Colour} props.color
 */
function ColorNotations({ color }) {
  return (
    <ul
      css={css`
        width: 100%;
        list-style: none;
        padding: 0.5rem 0;
        margin: 0;
        font-size: 1.5rem;
        line-height: 2;
      `}
    >
      <li>
        <code>{colours.hex(color)}</code>
      </li>
      <li>
        <code>{colours.rgba(color)}</code>
      </li>
      <li>
        <code>{colours.hsla(color)}</code>
      </li>
    </ul>
  );
}

export default App;
