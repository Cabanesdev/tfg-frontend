import styled from 'styled-components';


const TextArea = styled.textarea`
  border: none;
  resize: none;

  &:focus {
    outline: none;
  }

`

const CreateTextArea = styled(TextArea)`
  width: 90%;
  margin: 20px;
  color: white;
  background-color: var(--secondary-color);
  font-size: 2rem;
`

const CreateCommentTextArea = styled(TextArea)`
  width: 100%;
  color: white;
  padding: 2px;
  background-color: var(--secondary-color);
`

const EditUserTextArea = styled(TextArea)`
  width: 100%;
  height: 80px;
  color: white;
  margin-top: 10px;
  background: transparent;
`

export {CreateTextArea, CreateCommentTextArea, EditUserTextArea}
