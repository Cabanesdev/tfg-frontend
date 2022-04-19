import styled, { css } from 'styled-components';

const AuthButton = styled.button`
  width: 250px;
  height: 50px;
  border: none;
  border-radius: 15px;
  font-size: 1.125rem;
  cursor: pointer;

  ${({ login }) =>
    login &&
    css`
      margin-bottom: 40px;
      background-color: var(--primary-color);
    `}

  ${({ signUp }) =>
    signUp &&
    css`
      background-color: var(--grey);
      color: var(--white);
    `}
`;

export { AuthButton };
