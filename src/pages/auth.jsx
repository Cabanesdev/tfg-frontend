import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthModal from '../components/authModal';
import { Container, MainContainer } from '../components/styled/div';
import { MainTitle, SecondaryTitle } from '../components/styled/title';
import { AuthButton } from '../components/styled/button';
import { getSession } from '../utils/localstorage';

function Auth() {
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const token = getSession()
    if (token) navigate('/')
  }, [])

  const handleLoginOnClick = () => {
    setShowModal(!showModal);
    if (!showLogin) setShowLogin(true);
  };

  const handleRegisterOnClick = () => {
    setShowModal(!showModal);
    if (showLogin) setShowLogin(false);
  };

  return (
    <MainContainer
      flex
      fd={'column'}
      jc={'center'}
      ai={'center'}
      auth={!showModal}
    >
      {showModal ? (
        <AuthModal
          showLogin={showLogin}
          setShowModal={setShowModal}
          setShowLogin={setShowLogin}
        />
      ) : (
        <>
          <Container flex fd={'column'}>
            <Link to='/'>
              <MainTitle
                ta={'center'}
                c={'var(--primary-color)'}
                fs={'6.5rem'}
                fw={400}
              >
                Codex
              </MainTitle>
            </Link>
            <SecondaryTitle
              ta={'center'}
              c={'var(--white)'}
              fs={'2.5rem'}
              fw={400}
            >
              &lt;Where coders <br /><span>connect</span>
              /&gt;
            </SecondaryTitle>
          </Container>
          <Container flex fd={'column'} m={'90px 0 0 0'}>
            <AuthButton login onClick={handleLoginOnClick}>
              Login
            </AuthButton>
            <AuthButton signup onClick={handleRegisterOnClick}>
              Sign up
            </AuthButton>
          </Container>
        </>
      )}
      <ToastContainer theme="dark" />
    </MainContainer>
  );
}

export default Auth;
