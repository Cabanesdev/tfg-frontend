import styled, { css } from 'styled-components';

const flexOpt = (fd, jc, ai) => css`
  display: flex;
  flex-direction: ${fd};
  justify-content: ${jc};
  align-items: ${ai};
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--secondary-color-1);

  ${({ auth }) =>
    auth &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: linear-gradient(0deg, var(--secondary-color), #1b4e4d);
      background-size: 100% 100%;
      animation: wave 30s ease infinite;
    `}

  ${({ authModal }) =>
    authModal &&
    css`
      padding: 20px;
      background-color: var(--secondary-color-1);
      position: absolute;
    `}
`;

const Container = styled.div`
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  margin-top: ${(props) => props.mt};

  ${({ flex, fd, jc, ai }) => flex && flexOpt(fd, jc, ai)}
`;

const AuthModalContainer = styled(Container)`
  min-width: 400px;
  padding: 20px;
  border: 3px solid var(--white);
  border-radius: 15px;
`;

const AuthFormContainer = styled(Container)`
  & > * {
    margin: 30px;

    ${({ register }) =>
    register &&
    css`
        margin: 15px;
      `}
  }

  & > p {
    color: white;
  }

  & > p > span {
    color: var(--primary-color);
  }

  & > p > span:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const AuthInputContainer = styled(Container)`
  max-width: 380px;
  border-radius: 10px;
  padding: 5px;
  background-color: var(--secondary-color);
`;

export {
  MainContainer,
  Container,
  AuthModalContainer,
  AuthFormContainer,
  AuthInputContainer,
};
