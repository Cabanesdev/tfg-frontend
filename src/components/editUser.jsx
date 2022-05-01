import { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Container, EditUserContainer, ModalContainer } from './styled/div'
import { SecondaryTitle } from './styled/title';

function EditUser({ close }) {
  const [userData, setUserData] = useState({});

  useEffect(() => { }, [])

  return (
    <ModalContainer>
      <EditUserContainer>
        <Container flex fd={'column'} h={'100%'} w={'100%'} >
          <Container flex jc={'space-between'} ai={'center'} >
            <AiOutlineClose
              size={20}
              onClick={() => close(false)}
              style={{ color: 'white' }}
            />
            <Container w={'55%'}>
              <SecondaryTitle c={'var(--white)'}>Edit User</SecondaryTitle>
            </Container>
            <h2>Save</h2>
          </Container>
        </Container>
      </EditUserContainer>
    </ModalContainer >
  )
}

export default EditUser
