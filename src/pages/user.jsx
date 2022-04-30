import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Api from '../utils/api'
import { usernameFormatter } from '../utils/formatters'
import { deleteSession } from '../utils/localstorage';

import Navbar from '../components/navbar';
import Card from '../components/card';
import Post from '../components/post';

import {
  Container,
  MainContainer,
} from '../components/styled/div';
import { MainTitle, SecondaryTitle } from '../components/styled/title';
import { EditButton, SectionButton } from '../components/styled/button';




function User() {
  const [isPostActive, setIsPostActive] = useState(true);
  const [isCommitActived, setIsCommitActive] = useState(false);
  const [postData, setPostData] = useState([]);
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState({})
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const api = new Api()

  useEffect(() => {
    if (location.pathname === '/profile') {
      getSession()
    } else {
      getUserData()
    }
  }, [])

  const getSession = async () => {
    try {
      const response = await api.getSession()
      setUserData(response.data.data)
      getPostData(response.data.data._id)
    } catch (err) {
      if (err.response.status === 401) {
        deleteSession()
        navigate('/auth')

      }
    }
  }

  const getUserData = async () => {
    const response = await api.getUserById(id)
    setUserData(response.data.data)
    getPostData(response.data.data._id)
  }

  const getPostData = async (userId) => {
    const params = {
      userId,
      page
    }

    const response = await api.getPosts(params)
    setPostData([...postData, ...response.data.data])
  }


  const handleClickPostSection = () => {
    if (isCommitActived) {
      setPage(1);
      setIsCommitActive(false);
      setIsPostActive(true);
    }
  };

  const handleClickCommitSection = () => {
    if (isPostActive) {
      setPage(1);
      setIsPostActive(false);
      setIsCommitActive(true);
    }
  };

  return (
    <MainContainer>
      <Container w={'100%'} h={'100%'} flex>
        <Navbar />
        <Container
          w={'100%'}
          h={'100%'}
          of_y={'auto'}
        >
          <Container
            w={'80%'}
            bh
            bv
          >
            <Container bv m={'15px 0 0 0 '} p={'15px 15px 0 15px'}>
              <Container flex jc={'space-between'}>
                <Container flex fd={'column'}>
                  <MainTitle
                    c={'white'}
                    fs={'1.2rem'}>
                    {userData.name}
                  </MainTitle>
                  <SecondaryTitle
                    c={'var(--grey)'}
                    fs={'0.8rem'}>
                    {usernameFormatter(userData.username)}
                  </SecondaryTitle>
                  {userData.biography ?
                    <Container userData m={'10px 0 0 0'}>
                      <p>{userData.biography}</p>
                    </Container>
                    : null
                  }
                </Container>
                {location.pathname === '/profile' ?
                  (
                    <Container flex jc={'flex-end'}>
                      <EditButton>Edit</EditButton>
                    </Container>
                  ) : null}
              </Container>
              <Container flex jc={'space-evenly'} ai={'center'} m={'20px 0 0 0'}>
                <SectionButton
                  active={isCommitActived}
                  onClick={handleClickCommitSection}
                >
                  Commits
                </SectionButton>
                <SectionButton
                  active={isPostActive}
                  onClick={handleClickPostSection}
                >
                  Posts
                </SectionButton>
              </Container>
            </Container>
            <Container>
              {postData.map((data) =>
                <Card key={data._id}>
                  <Post data={data} />
                </Card>
              )}
            </Container>
          </Container>
        </Container>
      </Container>
    </MainContainer>
  )
}

export default User
