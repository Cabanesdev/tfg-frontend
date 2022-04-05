import React from 'react';
import './auth.css';

const Auth = () => {
  return (
    <div className='auth--main__container'>
      <div className='auth--titles__container'>
        <h1>Codex</h1>
        <h2>
          &lt;Where coders <br /> <span className='color'>connect</span>
          /&gt;
        </h2>
      </div>
      <div className='auth--buttons__container'>
        <button className='auth--button auth--button__login'>Login</button>
        <button className='auth--button auth--button__signup'>Sign up</button>
      </div>
    </div>
  );
};

export default Auth;
