import styled, { css } from 'styled-components';

const AuthButton = styled.button`
  width: 250px;
  height: 50px;
  border:none;
  border-radius: 15px;
  font-size: 1.125rem;
  cursor: pointer;

  ${({ login }) =>
    login &&
    css`
      color:black;
      margin-bottom: 40px;
      background-color: var(--primary-color);
    `}

  ${({ signup }) =>
    signup &&
    css`
      background-color: var(--grey);
      color: var(--white);
    `}
`;

const AuthFormButton = styled.button`
  width: 85%;
  height: 60px;
  max-width: 380px;
  border:none;
  border-radius: 15px;
  background-color: var(--primary-color);
  font-size: 1.125rem;
  cursor:pointer;
`


const CreatePostButton = styled.button`
  width: 50%;
  color: white;
  height: 40px;
  max-width: 380px;
  border: 2px solid var(--secondary-color);
  background: transparent;
  font-size: 0.8rem;
  cursor:pointer;

  &:hover {   
    border: 2px solid var(--primary-color);
  }
`

const CreateCommentButton = styled.button`
  width: 20%;
  height: 100%;
  max-width: 380px;
  color: white;
  border: 2px solid var(--secondary-color);
  background: transparent;
  font-size: 0.8rem;
  cursor:pointer;

  ${({ disabled }) =>
    !disabled && css`
      &:hover {   
        border: 2px solid var(--primary-color);
      }
    
  `}
`

const EditButton = styled.button`
  width: 100px;
  height: 25px;
  color: var(--white);
  background: none;
  border: 1px solid var(--grey);
  border-radius: 25px;

  &:hover {
  border: 1px solid var(--primary-color);
  }
`

const SectionButton = styled.button`
  border: none;
  color: var(--white);
  font-size: 1rem;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }

  ${({ active }) =>
    active && css`
      border-bottom: 1px solid var(--primary-color);
    `}
`;

export { AuthButton, AuthFormButton, CreatePostButton, CreateCommentButton, EditButton, SectionButton };
