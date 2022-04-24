import { useEffect, useRef, useState } from 'react';
import Api from '../utils/api';
import infiniteScroll from '../utils/scroll';
import {getSession} from '../utils/localstorage';

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
  const [userData, setUserData] = useState(null)
  const [page, setPage] = useState(1)
  const divRef = useRef()
  const api = new Api()


  useEffect(() => {
    const token = getSession()
    if(token) getUserSession()

  }, [])


  useEffect(() => {
    getPosts()
  }, [page])

  const getPosts = async () => {
    const response = await api.getPosts(page)
    setPostData([...postData, ...response.data.data])
  }

  const getUserSession = async () => {
    try{
      const response  = await api.getSession()
      setUserData(response.data.data)
    } catch(err){
    }
  }

  return (
    <MainContainer>
      <Container w={'100%'} h={'100%'} flex>
        <Navbar user={userData} />
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
