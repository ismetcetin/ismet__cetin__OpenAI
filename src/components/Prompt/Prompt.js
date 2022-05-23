import React from "react";
import { useState } from "react";
import "./Prompt.scss";

export default function Prompt({ getResponse, setPrompt, isLoading, setValid }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (text.length < 3) {
        setValid(false);
        return;
    }
    setPrompt(text);
    getResponse(text);
    setText("");
    setValid(true);
  }

  return (
    <div className="prompt">
      <form className="prompt__form" onSubmit={handleSubmit}>
        <div className="prompt__text">
          <label className="prompt__label" htmlFor="prompt">Enter Prompt</label>
          <textarea
            className="prompt__textarea"
            id="prompt"
            autoComplete="off"
            placeholder=" "
            value={text}
            onChange={(e) => setText(e.target.value)}
          >
            {text}
          </textarea>
        </div>
        <div>
          {isLoading ? (
            <button className="prompt__btn prompt__btn__loading" disabled>Processing...</button>
          ) : (<button className="prompt__btn">Submit</button>)}
        </div>
      </form>
    </div>
  );
}
