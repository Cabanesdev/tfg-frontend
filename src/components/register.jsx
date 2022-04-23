import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { MainTitle } from './styled/title';
import { AuthFormContainer, AuthInputContainer } from './styled/div';
import { AuthInput } from './styled/input';
import { AuthFormButton } from './styled/button';
import Api from '../utils/api'

const Register = ({ setShowLogin }) => {
  const [passInputType, setPassInputType] = useState('password');
  const [repeatPassInputType, setRepeatPassInputType] = useState('password');
  const nameRef = useRef({});
  const usernameRef = useRef({});
  const emailRef = useRef({});
  const passwordRef = useRef({});
  const repeatPasswordRef = useRef({});
  const ICON_COLOR = { color: 'white' };

  const handleResgisterOnClick = () => {
    if (passwordRef.current.value !== repeatPasswordRef.current.value) {
      console.log('The password doesnt match');
      return;
    }

    const data = {
      name: nameRef.current.value,
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    registerUser(data)
  };

  const registerUser = async (data) => {
    try {
      const api = new Api()

      const response = await api.register(data)

      toast.success(response.data.message, {
        autoClose: 2500,
        pauseOnHover: false,
      });

    setShowLogin(true)
      
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.data, {
          autoClose: 2500,
          pauseOnHover: false,
        });
      }
    }
  }


  const showPassword = () => {
    const type = passInputType === 'password' ? 'text' : 'password';
    setPassInputType(type);
  };

  const showRepeatPassword = () => {
    const type = repeatPassInputType === 'password' ? 'text' : 'password';
    setRepeatPassInputType(type);
  };

  return (
    <>
      <MainTitle ta={'center'} c={'var(--primary-color)'} fs={'4.5rem'}>
        Register
      </MainTitle>
      <AuthFormContainer flex register fd={'column'} ai={'center'} w={'100%'}>
        <AuthInputContainer w={'85%'}>
          <AuthInput ref={nameRef} placeholder='Name' />
        </AuthInputContainer>
        <AuthInputContainer w={'85%'}>
          <AuthInput ref={usernameRef} placeholder='Username' />
        </AuthInputContainer>
        <AuthInputContainer w={'85%'}>
          <AuthInput ref={emailRef} placeholder='Email' />
        </AuthInputContainer>
        <AuthInputContainer w={'85%'} flex ai={'center'}>
          <AuthInput
            ref={passwordRef}
            placeholder='Password'
            type={passInputType}
          />
          {passInputType === 'password' ? (
            <AiFillEyeInvisible
              size={15}
              style={ICON_COLOR}
              onClick={showPassword}
            />
          ) : (
            <AiFillEye size={15} style={ICON_COLOR} onClick={showPassword} />
          )}
        </AuthInputContainer>
        <AuthInputContainer w={'85%'} flex ai={'center'}>
          <AuthInput
            ref={repeatPasswordRef}
            placeholder='Repeat password'
            type={repeatPassInputType}
          />
          {repeatPassInputType === 'password' ? (
            <AiFillEyeInvisible
              size={15}
              style={ICON_COLOR}
              onClick={showRepeatPassword}
            />
          ) : (
            <AiFillEye
              size={15}
              style={ICON_COLOR}
              onClick={showRepeatPassword}
            />
          )}
        </AuthInputContainer>
        <AuthFormButton onClick={handleResgisterOnClick}>Register</AuthFormButton>
        <p>
          Already have and account?{' '}
          <span onClick={() => setShowLogin(true)}>Login.</span>
        </p>
      </AuthFormContainer>
    </>
  );
};

export default Register;
