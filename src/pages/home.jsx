import { useEffect, useState } from 'react';
import Api from '../utils/api';

import Navbar from '../components/navbar';
import Card from '../components/card';
import Post from '../components/post';
import {
  Container,
  MainContainer,
  PostsContainer,
} from '../components/styled/div';


function Home() {
  const [postData, setPostData] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    try{
      const api = new Api()
      const response = await api.getPosts(page)
      setPostData(response.data.data)
    }catch(err){
      console.log(err)
    }

    
  }

  return (
    <MainContainer>
      <Container w={'100%'} h={'100%'} flex>
        <Navbar user={null} />
        <PostsContainer border flex>
          {postData.map((data) => 
            <Card key={data._id}>
              <Post data={data} />
            </Card>
          )}
        </PostsContainer>
      </Container>
    </MainContainer>
  );
};

export default Home;
