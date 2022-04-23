import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { MainTitle } from './styled/title';
import { AuthFormContainer, AuthInputContainer } from './styled/div';
import { AuthInput } from './styled/input';
import { AuthFormButton } from './styled/button';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Api from '../utils/api';
import { saveSession } from '../utils/localstorage';

function LoginForm({ setShowLogin }) {
  const [inputType, setInputType] = useState('password');
  const usernameRef = useRef({});
  const passwordRef = useRef({});
  const ICON_COLOR = { color: 'white' };

  const handleButtonOnClick = () => {
    const data = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    loginUser(data);
  };
  const loginUser = async (data) => {
    try {
      const api = new Api();

      const response = await api.login(data);
      console.log(response)

      saveSession(response.headers['bearer-token'])
      toast.success(response.data.data, {
        autoClose: 1000,
        pauseOnHover: false,
      });

    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.data, {
          autoClose: 2500,
          pauseOnHover: false,
        });
      }
    }
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
      <AuthFormContainer
        flex
        fd={'column'}
        ai={'center'}
        w={'100%'}
        mt={'97px'}
      >
        <AuthInputContainer w={'85%'}>
          <AuthInput ref={usernameRef} placeholder="Username" />
        </AuthInputContainer>
        <AuthInputContainer w={'85%'} flex ai={'center'}>
          <AuthInput
            ref={passwordRef}
            placeholder="Password"
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
    </>
  );
};

export default LoginForm;
