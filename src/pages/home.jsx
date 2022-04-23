import Navbar from '../components/navbar';
import {
  Container,
  MainContainer,
  PostsContainer,
} from '../components/styled/div';

function Home() {
  return (
    <MainContainer>
      <Container w={'100%'} h={'100%'} flex>
        <Navbar user={null} />
        <PostsContainer border></PostsContainer>
      </Container>
    </MainContainer>
  );
};

export default Home;
