import styled from 'styled-components';

const CreateTextArea = styled.textarea`
  width: 90%;
  margin: 20px;
  border: none;
  color: white;
  background-color: var(--secondary-color);
  resize: none;
  font-size: 2rem;

  &:focus {
    outline: none;
  }

`

export default CreateTextArea
