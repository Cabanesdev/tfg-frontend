import React from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import './authModal.css';

const AuthModal = ({showLoginComponent, showModal}) => {
  return (
    <div className='authModal__main--container'>
      <div className='authModal__secondary--container'>
        <div
          onClick={() => {
            showModal(false);
          }}
          className='authModal__close--container'
        >
          <AiOutlineClose size={20} style={{color: 'white'}} />
        </div>
        <div className='authModal__content--container'>
          <h1>Login</h1>
          {showLoginComponent ? 'login' : 'register'}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
