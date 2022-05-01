import { ModalCenterContainer, ModalContainer } from './styled/div'
function Modal({children}) {
  return (
    <ModalContainer >
      <ModalCenterContainer> {children} </ModalCenterContainer>
    </ModalContainer>
  )
}

export default Modal;
