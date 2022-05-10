import { Container } from './styled/div';
import { ModalButton } from './styled/button';

function DeletePost({ closeModal, deletePost, showDelete }) {

  return (
    <Container modalContent flex fd={'column'} jc={'space-between'} ai={'center'} w={'100%'} h={'100%'} >
      <h1>Delete</h1>
      <p>Do you want to delete the Post?</p>
      <p>This operation cannot be undone</p>
      <Container flex jc={'space-evenly'} w={'100%'} m={'0 0 15px 0'}>
        <ModalButton
          cancel
          onClick={() => {
            showDelete(false)
            closeModal(false)
          }}
        >
          No
        </ModalButton>
        <ModalButton
          main
          onClick={() => deletePost()}
        >
          Yes
        </ModalButton>
      </Container>
    </Container >
  );
}

export default DeletePost;
