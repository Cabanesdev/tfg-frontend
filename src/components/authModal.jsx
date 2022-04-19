import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { AuthModalContainer, MainContainer, Container } from './styled/div';

const AuthModal = ({ showLoginComponent, showModal }) => {
  return (
    <MainContainer authModal>
      <AuthModalContainer flex w={'40%'} h={'80%'} fd={'column'}>
        <div
          onClick={() => {
            showModal(false);
          }}
        >
          <AiOutlineClose size={20} style={{ color: 'white' }} />
        </div>
        <Container flex fd={'column'} ai={'center'}>
          <h1>Login</h1>
          {showLoginComponent ? 'login' : 'register'}
        </Container>
      </AuthModalContainer>
    </MainContainer>
  );
};

export default AuthModal;
