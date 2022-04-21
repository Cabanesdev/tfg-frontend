import { AiOutlineClose } from 'react-icons/ai';
import { AuthModalContainer, MainContainer, Container } from './styled/div';
import Login from './login';

const AuthModal = ({ showLogin, setShowModal, setShowLogin}) => {
  return (
    <MainContainer authModal>
      <AuthModalContainer flex w={'40%'} h={'80%'} fd={'column'}>
        <div
          onClick={() => setShowModal(false)}
        >
          <AiOutlineClose size={20} style={{ color: 'white' }} />
        </div>
        <Container flex fd={'column'} ai={'center'}>
          {showLogin ? <Login setShowLogin={setShowLogin}/> : 'register'}
        </Container>
      </AuthModalContainer>
    </MainContainer>
  );
};

export default AuthModal;
