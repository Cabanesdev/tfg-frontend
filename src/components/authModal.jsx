import { AiOutlineClose } from 'react-icons/ai';
import { AuthModalContainer, MainContainer, Container } from './styled/div';
import Login from './login';

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
          {showLoginComponent ? <Login /> : 'register'}
        </Container>
      </AuthModalContainer>
    </MainContainer>
  );
};

export default AuthModal;
