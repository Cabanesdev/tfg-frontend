import styled, { css } from 'styled-components';
import MDEditor from '@uiw/react-md-editor';

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
  overflow: hidden;

  ${({ flex, fd, jc, ai }) => flex && flexOpt(fd, jc, ai)}

  ${({ auth }) =>
    auth &&
    css`
      background: linear-gradient(0deg, var(--secondary-color), #1b4e4d);
      background-size: 100% 100%;
      animation: wave 30s ease infinite;
    `}
`;

const Container = styled.div`
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  max-width: ${(props) => props.mw};
  margin: ${(props) => props.m};
  padding: ${(props) => props.p};
  overflow-y: ${(props) => props.of_y};
  overflow-x: ${(props) => props.of_x};

  ${({ flex, fd, jc, ai }) => flex && flexOpt(fd, jc, ai)}

  ${({ postUD }) =>
    postUD &&
    css`
      & > * {
        margin: 2.5px;
      }
    `}

  ${({ bh }) =>
    bh &&
    css`
      border-left: 2px solid var(--secondary-color);
      border-right: 2px solid var(--secondary-color);
    `}

 ${({ bv }) =>
    bv &&
    css`
      border-top: 2px solid var(--secondary-color);
      border-bottom: 2px solid var(--secondary-color);
    `}

  ${({ create }) =>
    create && css`
      max-height: 750px;
      background-color: var(--secondary-color);
      border-radius: 5px;
  `}

  ${({ createComment }) =>
    createComment && css`
      max-width: 400px;
      border: 3px solid var(--secondary-color);
      border-radius: 5px;
  `}

    ${({ userData }) =>
    userData && css`
      & > * {
        color: white;
        word-break: break-word;
        font-size: 0.8rem;
      }
    `}

    ${({ modalContent }) =>
    modalContent && css`
      & > * {
        color: white;
      }
    `}
`

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

const PostsContainer = styled(Container)`
  width: 80%;
  min-width: 320px;

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
  background-color: var(--secondary-color-1);
  width: 100%;
  border-bottom: 2px solid var(--secondary-color);

  & > * {
    color: white;
  }
`;

const PostView = styled.div`
  width: 85%;
  max-width: 1000px;
  height: fit-content;
  margin: 10px 0 0 0;
  padding: 20px;
  border: 2px solid var(--secondary-color);
  border-radius: 5px;

  & > * {
    color: white;
  }
`

const MDEditorStyled = styled(MDEditor)`
  width: 100%;
  background-color: var(--secondary-color);
  box-shadow:none;

  & > div {
    padding: 0;
  }

  & > .w-md-editor-content {
    height: 100%;
    background-color: var(--secondary-color);
  }
    
  & > .w-md-editor-bar {
    display:none;
  }
`

const CommentContainer = styled.div`
  max-width: 900px;
  margin: 20px 0 0 0;
  padding: 5px;
  background-color: var(--secondary-color);
  border-radius: 5px;

  & > div > p {
    word-break: break-word;
  }
`

const ModalContainer = styled.div`
  position: absolute;
  top: 0%;
  width: 100%;
  height: 100%;
  background-color: #080707d9;
`;

const ModalCenterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 200px;
  border: 1px solid black;
  background-color: var(--secondary-color-1);
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
  CardContainer,
  PostView,
  MDEditorStyled,
  CommentContainer,
  ModalContainer,
  ModalCenterContainer
};
