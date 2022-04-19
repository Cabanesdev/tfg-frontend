import { MainTitle } from './styled/title';
import { Container } from './styled/div';

const LoginForm = () => {
  return (
    <>
      <MainTitle ta={'center'} c={'var(--primary-color)'} fs={'4.5rem'}>
        Login
      </MainTitle>
      <Container flex fd={'column'} ai={'center'} w={'100%'} mt={'97px'} />
    </>
  );
};

export default LoginForm;
