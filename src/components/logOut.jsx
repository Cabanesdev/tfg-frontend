import { Container } from './styled/div';
import { ModalButton } from './styled/button';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../utils/utils';

function LogOut({ closeModal }) {
  const navigate = useNavigate();

  return (
    <Container modalContent flex fd={'column'} jc={'space-between'} ai={'center'} w={'100%'} h={'100%'} >
      <h1>Logout</h1>
      <p>Do you want to sign off?</p>
      <Container flex jc={'space-evenly'} w={'100%'} m={'0 0 15px 0'}>
        <ModalButton
          cancel
          onClick={() => closeModal(false)}
        >
          No
        </ModalButton>
        <ModalButton
          main
          onClick={() => logOut(navigate)}
        >
          Yes
        </ModalButton>
      </Container>
    </Container>
  );
}

export default LogOut;
