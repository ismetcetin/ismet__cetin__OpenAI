import React from "react";
import './Response.scss';
import {FaTimesCircle} from 'react-icons/fa';

export default function Response({ card: { prompt, response }, index, handleDelete}) {
  return (
    <section className="response-card">
      <div className="response-card__prompt">
        <p className="response-card__label">Prompt:</p>
        <p className="response-card__text">{prompt}</p>
      </div>
      <div className="response-card__response">
        <p className="response-card__label">Response:</p>
        <p className="response-card__text">{response}</p>
      </div>
      <button onClick={() => handleDelete(index)} className="response-card__btn"><FaTimesCircle /></button>
    </section>
  );
}
