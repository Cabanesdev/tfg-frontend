import { useEffect, useRef, useState } from 'react';
import Api from '../utils/api';
import infiniteScroll from '../utils/scroll';

import Navbar from '../components/navbar';
import Card from '../components/card';
import Post from '../components/post';
import Modal from '../components/modal';
import LogOut from '../components/logOut';
import {
  Container,
  MainContainer,
  PostsContainer,
} from '../components/styled/div';


function Home() {
  const [postData, setPostData] = useState([])
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false);
  const divRef = useRef()

  useEffect(() => {
    getPosts()
  }, [page])

  const getPosts = async () => {
    const params = { page }
    const api = new Api()
    const response = await api.getPosts(params)
    setPostData([...postData, ...response.data.data])
  }


  return (
    <MainContainer>
      <Container w={'100%'} h={'100%'} flex>
        <Navbar showModal={setShowModal} />
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
      {showModal ? <Modal><LogOut closeModal={setShowModal} /></Modal> : null}
    </MainContainer>
  );
};

export default Home;
