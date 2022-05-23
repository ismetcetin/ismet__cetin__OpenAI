import React from 'react';
import logo from '../../assets/images/openai.png';
import './Header.scss';

export default function Header() {
 return (
    <header className='header'>
        <img className="header__img" src={logo} alt="The OpenAI Logo" />
        <h1 className='header__slogan'>Fun with AI</h1>
    </header>
  )
}
