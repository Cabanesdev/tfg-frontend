import { useEffect, useRef, useState } from 'react';
import Api from '../utils/api';
import infiniteScroll from '../utils/scroll';

import Navbar from '../components/navbar';
import Card from '../components/card';
import Post from '../components/post';
import Commit from '../components/commit';
import Modal from '../components/modal';
import LogOut from '../components/logOut';
import CreateCommit from '../components/createCommit';
import {
  Container,
  MainContainer,
  PostsContainer,
} from '../components/styled/div';


function Home() {
  const [postData, setPostData] = useState([])
  const [isPostsActive, setIsPostsActive] = useState(true)
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false);
  const divRef = useRef()
  const api = new Api()

  useEffect(() => {
    getData()
  }, [isPostsActive])

  useEffect(() => {
    if (page > 1)
      updateData()
  }, [page])


  const getData = async () => {
    const params = { page: 1 }
    if (isPostsActive) {
      const response = await api.getPosts(params)
      setPostData(response.data.data)
      setPage(1)
    } else {
      const response = await api.getCommits(params)
      setPostData(response.data.data)
      setPage(1)
    }
  }

  const updateData = async () => {
    const params = { page }
    if (isPostsActive) {
      const response = await api.getPosts(params)
      setPostData([...postData, ...response.data.data])
    } else {
      const response = await api.getCommits(params)
      setPostData([...postData, ...response.data.data])
    }
  }

  return (
    <MainContainer>
      <Container w={'100%'} h={'100%'} flex>
        <Navbar
          showModal={setShowModal}
          isHomePage={true}
          isPostsActive={isPostsActive}
          setIsPostsActive={setIsPostsActive}
          setPostData={setPostData}
        />
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
            {
              isPostsActive ? null : <CreateCommit getData={getData} />
            }

            {postData.map((data) =>
              <Card key={data._id}>
                {
                  isPostsActive ?
                    <Post data={data} />
                    : <Commit data={data} />
                }
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
