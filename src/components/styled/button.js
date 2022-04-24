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


export { AuthButton, AuthFormButton };
