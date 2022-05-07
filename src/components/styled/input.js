import styled from 'styled-components';

const AuthInput = styled.input`
  width: 100%;
  height: 60px;
  background-color: transparent;
  border: none;
  color: var(--white);

  &:focus {
    outline:none;
  }
`

const EditInput = styled.input`
  width: 100%;
  height: 20px;
  border: none;
  background-color: transparent;
  margin-top: 5px;
  color: white;

  &:focus {
    outline:none;
  }

 
`

export { AuthInput, EditInput }
