import { useRef, useState } from 'react';
import { MainTitle } from './styled/title';
import { AuthFormContainer, AuthInputContainer } from './styled/div';
import { AuthInput } from './styled/input';
import { AuthFormButton } from './styled/button';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const LoginForm = ({ setShowLogin }) => {
  const [inputType, setInputType] = useState('password');
  const usernameRef = useRef({});
  const passwordRef = useRef({});
  const ICON_COLOR = { color: 'white' };

  const handleButtonOnClick = () => {
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    // Call api function
    console.log(data);
  };

  const handleClickPassIcon = () => {
    const type = inputType === 'password' ? 'text' : 'password';
    setInputType(type);
  };

  return (
    <>
      <MainTitle ta={'center'} c={'var(--primary-color)'} fs={'4.5rem'}>
        Login
      </MainTitle>
    <form>
      <AuthFormContainer
        flex
        fd={'column'}
        ai={'center'}
        w={'100%'}
        mt={'97px'}
      >
        <AuthInputContainer w={'85%'}>
          <AuthInput ref={usernameRef} placeholder='Username' />
        </AuthInputContainer>
        <AuthInputContainer w={'85%'} flex ai={'center'}>
          <AuthInput
            ref={passwordRef}
            placeholder='Password'
            type={inputType}
          />
          {inputType === 'password' ? (
            <AiFillEyeInvisible
              size={15}
              style={ICON_COLOR}
              onClick={() => handleClickPassIcon(passwordRef)}
            />
          ) : (
            <AiFillEye
              size={15}
              style={ICON_COLOR}
              onClick={() => handleClickPassIcon(passwordRef)}
            />
          )}
        </AuthInputContainer>
        <AuthFormButton onClick={handleButtonOnClick}>Login</AuthFormButton>
        <p>
          New to codex?{' '}
          <span onClick={() => setShowLogin(false)}>Create and account.</span>
        </p>
      </AuthFormContainer>
    </form>
    </>
  );
};

export default LoginForm;
