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

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  width: 15%;
  height: 100%;
  padding: 10px;
  border-bottom: 1px solid black;
  border-radius: 2.5px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 5px;

  & > a > img {
    width: 50px;
  }
`;

const NavbarActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  & > * {
    margin: 15px;
  }
`;

const PostsContainer = styled.div`
  width: 60%;
  height: 100%;
  padding: 15px;
  overflow-y: auto;
  overflow-x: hidden;

  ${({ border }) =>
    border &&
    css`
      border-left: 2px solid var(--secondary-color);
      border-right: 2px solid var(--secondary-color);
    `}

  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `}
`;


const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-bottom: 2rem;
  border: 1px solid black;
  padding: 5px;
  cursor: pointer;
  box-shadow: 5px 5px 5px #192038;

  &:hover {
    box-shadow: 0px 3px 3px #0d101c;
  }

  & > * {
    margin: 2.5px;
  }
`;

export {
  MainContainer,
  Container,
  AuthModalContainer,
  AuthFormContainer,
  AuthInputContainer,
  NavbarContainer,
  LogoContainer,
  NavbarActionsContainer,
  PostsContainer,
  CardContainer
};
