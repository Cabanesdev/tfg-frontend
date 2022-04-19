import { useState } from 'react';
import AuthModal from '../components/authModal';
import { Container, MainContainer } from '../components/styled/div';
import { MainTitle, SecondaryTitle } from '../components/styled/title';
import { AuthButton } from '../components/styled/button';

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

  return (
    <MainContainer auth={!showModal}>
      {showModal ? (
        <AuthModal showLoginComponent={showLogin} showModal={setShowModal} />
      ) : (
        <>
          <Container flex fd={'column'}>
            <MainTitle
              ta={'center'}
              c={'var(--primary-color)'}
              fs={'6.5rem'}
              fw={400}
            >
              Codex
            </MainTitle>
            <SecondaryTitle
              ta={'center'}
              c={'var(--white)'}
              fs={'2.5rem'}
              fw={400}
            >
              &lt;Where coders <br /> <span className='color'>connect</span>
              /&gt;
            </SecondaryTitle>
          </Container>
          <Container flex fd={'column'} mt={'90px'}>
            <AuthButton login onClick={handleLoginOnClick}>
              Login
            </AuthButton>
            <AuthButton signup onClick={handleRegisterOnClick}>
              Sign up
            </AuthButton>
          </Container>
        </>
      )}
    </MainContainer>
  );
};

export default Auth;
