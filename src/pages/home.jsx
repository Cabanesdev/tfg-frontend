import { useEffect, useRef, useState } from 'react';
import Api from '../utils/api';
import infiniteScroll from '../utils/scroll';
import { getSession } from '../utils/localstorage';

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
  const [showPosts, setShowPosts] = useState(true)
  const [page, setPage] = useState(1)
  const divRef = useRef()

  useEffect(() => {
    getPosts()
  }, [page])

  const getPosts = async () => {
    const api = new Api()
    const response = await api.getPosts(page)
    setPostData([...postData, ...response.data.data])
  }


  return (
    <MainContainer>
      <Container w={'100%'} h={'100%'} flex>
        <Navbar showPosts={showPosts}/>
        <Container
          w={'100%'}
          h={'100%'}
          of_y={'auto'}
          ref={divRef}
          onScroll={() => infiniteScroll(divRef, page, setPage)}
        >
          <PostsContainer
            border
            flex
          >
            {postData.map((data) =>
              <Card key={data._id}>
                <Post data={data} />
              </Card>
            )}
          </PostsContainer>
        </Container>
      </Container>
    </MainContainer>
  );
};

export default Home;
