import { useEffect, useRef,  useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';

import Api from '../utils/api'
import infiniteScroll from '../utils/scroll';
import { usernameFormatter } from '../utils/formatters'

import Modal from '../components/modal';
import LogOut from '../components/logOut';
import Navbar from '../components/navbar';
import Card from '../components/card';
import Post from '../components/post';
import Commit from '../components/commit';

import EditUser from '../components/editUser';

import {
  Container,
  MainContainer,
} from '../components/styled/div';
import { MainTitle, SecondaryTitle } from '../components/styled/title';
import { EditButton, SectionButton } from '../components/styled/button';
import { AiOutlineLink, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

function User() {
  const [isCommitActived, setIsCommitActive] = useState(true);
  const [editUserModal, setEditUserModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postData, setPostData] = useState([]);
  const [userSession, setUserSession] = useState(false);
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState({});
  const { id } = useParams();
  const divRef = useRef({})
  const api = new Api();

  useEffect(() => {
    getUserData();
  }, [id])

  useEffect(() => {
    getPostData();
  }, [isCommitActived])

  useEffect(() => {
    if (page > 1)
      updateData(id);
  }, [page])


  const getUserData = async () => {
    const response = await api.getUserById(id);
    setUserData(response.data.data);
    getUserSession(id)
  }

  const getUserSession = async (userDataId) => {
    try {
      const response = await api.getSession();
      if (response.data.data._id === userDataId)
        setUserSession(true);
    } catch (err) { }
  }

  const getPostData = async (userId) => {
    const params = { userId, page: 1 };
    let response
    if (isCommitActived) {
      response = await api.getCommits(params);
    } else {
      response = await api.getPosts(params);
    }
    setPostData(response.data.data);
    setPage(1);
  }

  const updateData = async (userId) => {
    const params = { userId, page };
    let response
    if (isCommitActived) {
      response = await api.getCommits(params);
    } else {
      response = await api.getPosts(params);
    }
    setPostData([...postData, ...response.data.data]);
  }


  const handleClickCommitSection = () => {
    if (!isCommitActived) {
      setIsCommitActive(true);
    }
  }

  const handleClickPostSection = () => {
    if (isCommitActived) {
      setIsCommitActive(false);
    }
  };

  return (
    <MainContainer>
      <Container w={'100%'} h={'100%'} flex>
        <Navbar showModal={setShowModal} />
        <Container
          ref={divRef}
          w={'100%'}
          h={'100%'}
          of_y={'auto'}
          onScroll={() => infiniteScroll(divRef, page, setPage)}
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
                  <Container>
                    {userData.biography ?
                      <Container userData m={'15px 0 0 0'}>
                        <p>{userData.biography}</p>
                      </Container>
                      : null
                    }
                    <Container flex ai={'center'} userData m={'15px 0 0 0'}>
                      {userData.webpage ? (
                        <Container flex ai={'center'} m={'0 5px 0 0'} >
                          <a href={userData.webpage} target='_blank'>
                            <AiOutlineLink size={18} style={{ color: 'var(--grey)' }} />
                          </a>
                        </Container>
                      ) : null}

                      {userData.github ? (
                        <Container flex ai={'center'} m={'0 5px 0 0'} >
                          <a href={userData.github} target='_blank'>
                            <AiFillGithub size={18} style={{ color: 'var(--grey)' }} />
                          </a>
                        </Container>
                      ) : null}

                      {userData.linkedin ? (
                        <Container flex ai={'center'} m={'0 5px 0 0'} >
                          <a href={userData.linkedin} target='_blank'>
                            <AiFillLinkedin size={18} style={{ color: 'var(--grey)' }} />
                          </a>
                        </Container>
                      ) : null}
                    </Container>
                  </Container>
                </Container>
                {userSession ?
                  (
                    <Container flex jc={'flex-end'}>
                      <EditButton onClick={() => setEditUserModal(true)} >Edit</EditButton>
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
                  active={!isCommitActived}
                  onClick={handleClickPostSection}
                >
                  Posts
                </SectionButton>
              </Container>
            </Container>
            <Container>
              {postData.map((data) =>
                <Card key={data._id}>
                  {
                    isCommitActived ?
                      <Commit data={data} />
                      : <Post data={data} />
                  }
                </Card>
              )}
            </Container>
          </Container>
        </Container>
      </Container>
      {showModal ? <Modal><LogOut closeModal={setShowModal} /></Modal> : null}
      {editUserModal ? <EditUser close={setEditUserModal} /> : null}
    </MainContainer>
  )
}

export default User
