import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Api from '../utils/api'
import { profileDateFormatter, urlFormatter, usernameFormatter } from '../utils/formatters'
import { deleteSession, getSession } from '../utils/localstorage';

import Modal from '../components/modal';
import LogOut from '../components/logOut';
import Navbar from '../components/navbar';
import Card from '../components/card';
import Post from '../components/post';
import EditUser from '../components/editUser';

import {
  Container,
  MainContainer,
} from '../components/styled/div';
import { MainTitle, SecondaryTitle } from '../components/styled/title';
import { EditButton, SectionButton } from '../components/styled/button';
import { AiOutlineLink, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

function User() {
  const [isPostActive, setIsPostActive] = useState(true);
  const [isCommitActived, setIsCommitActive] = useState(false);
  const [editUserModal, setEditUserModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postData, setPostData] = useState([]);
  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const api = new Api();

  useEffect(() => {
    if (location.pathname === '/profile') {
      getUserSession();
    } else {
      const token = getSession();
      if (token)
        checkIfUserIsSession();
      getUserData();
    }
  }, [])

  const getUserSession = async () => {
    try {
      const response = await api.getSession();
      setUserData(response.data.data);
      getPostData(response.data.data._id);
    } catch (err) {
      if (err.response.status === 401) {
        deleteSession();
        navigate('/auth');
      }
    }
  }

  const getUserData = async () => {
    const response = await api.getUserById(id);
    setUserData(response.data.data);
    getPostData(response.data.data._id);
  }


  const checkIfUserIsSession = async () => {
    const response = await api.getSession();
    if (response.data.data._id === id) navigate('/profile');
  }

  const getPostData = async (userId) => {
    const params = {
      userId,
      page
    };

    const response = await api.getPosts(params);
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
        <Navbar showModal={setShowModal} />
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
                {location.pathname === '/profile' ?
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
      {showModal ? <Modal><LogOut closeModal={setShowModal} /></Modal> : null}
      {editUserModal ? <EditUser close={setEditUserModal} /> : null}
    </MainContainer>
  )
}

export default User
