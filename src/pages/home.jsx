import Navbar from '../components/navbar';
import Card from '../components/card';
import Post from '../components/post';
import {
  Container,
  MainContainer,
  PostsContainer,
} from '../components/styled/div';

          // <Card>
          //   <Post data={{ title: "Test Title" }}></Post>
          // </Card>
          // <Card>
          //   <Post data={{ title: "Test Title" }}></Post>
          // </Card>
          // <Card>
          //   <Post data={{ title: "Test Title" }}></Post>
          // </Card>

function Home() {
  return (
    <MainContainer>
      <Container w={'100%'} h={'100%'} flex>
        <Navbar user={null} />
        <PostsContainer border flex>
          <Card>
            <Post data={{ title: 'Diving into Devs Relevancy Feed Builder', creationDate: '22/04/2022', userId: '62645711ffccf907174b6a1c' }}></Post>
          </Card>
        </PostsContainer>
      </Container>
    </MainContainer>
  );
};

export default Home;
