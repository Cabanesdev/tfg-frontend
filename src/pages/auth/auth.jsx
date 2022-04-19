import React, {useState} from 'react';
import AuthModal from '../../components/authModal/authModal';
import './auth.css';

const Auth = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginOnClick = () => {
    setShowModal(!showModal);
    if (!showLogin) setShowLogin(true);
  };

  const handleRegisterOnClick = () => {
    setShowModal(!showModal);
    if (showLogin) setShowLogin(false);
  };

  console.log('modal State', showModal);
  console.log('login State', showLogin);

  return (
    <div className='auth--main__container'>
      {showModal ? (
        <AuthModal showLoginComponent={showLogin} showModal={setShowModal} />
      ) : (
        <>
          <div className='auth--titles__container'>
            <h1>Codex</h1>
            <h2>
              &lt;Where coders <br /> <span className='color'>connect</span>
              /&gt;
            </h2>
          </div>
          <div className='auth--buttons__container'>
            <button
              onClick={handleLoginOnClick}
              className='auth--button auth--button__login'
            >
              Login
            </button>
            <button
              onClick={handleRegisterOnClick}
              className='auth--button auth--button__signup'
            >
              Sign up
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Auth;
