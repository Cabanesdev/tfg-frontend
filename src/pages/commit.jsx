import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"

import Api from "../utils/api";
import infiniteScroll from '../utils/scroll';


import Navbar from "../components/navbar"
import Card from '../components/card';
import Commit from '../components/commit';
import Modal from '../components/modal';
import LogOut from '../components/logOut';

import { Container, MainContainer, PostView } from "../components/styled/div"
import { FifthlyTitle, ForthlyTitle } from "../components/styled/title"
import { CgProfile } from "react-icons/cg";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiGitCommit } from "react-icons/bi";
import { usernameFormatter, dateTimeFormatter } from "../utils/formatters";
import CreateCommit from "../components/createCommit";
import { BsTrash } from "react-icons/bs";
import { getSession } from "../utils/localstorage";

function ViewCommit() {
  const [page, setPage] = useState(1)
  const [commitData, setCommitData] = useState({})
  const [userData, setUserData] = useState({})
  const [userDataReply, setUserDataReply] = useState({})
  const [userSession, setUserSession] = useState(false);
  const [subCommits, setSubCommits] = useState([])
  const [showModal, setShowModal] = useState(false);
  const divRef = useRef({})
  const { id } = useParams();
  const navigate = useNavigate();

  const api = new Api();

  useEffect(() => {
    getCommit();
  }, [id])

  useEffect(() => {
    if (page > 1)
      updateSubcommits();
  }, [page])

  const getCommit = async () => {
    try {
      const response = await api.getOneCommit(id)
      setCommitData(response.data.data)
      getUserData(response.data.data.userId)
      setPage(1);

      if (response.data.data.commitId) getUserDataReply(response.data.data.commitId)

      if (response.data.data.commitNumber > 0) {
        getSubCommits(response.data.data._id, 1);
      } else {
        setSubCommits([])
      }
    } catch (err) {
      if (err.response) navigate('/home');
    }
  }

  const getUserData = async (userId) => {
    const response = await api.getUserById(userId)
    setUserData(response.data.data)
    const token = getSession()
    if (token)
      getUserSession(response.data.data._id)
  }

  const getUserDataReply = async (commitId) => {
    const { data: { data: commitResponse } } = await api.getOneCommit(commitId)
    const { data: { data: userResponse } } = await api.getUserById(commitResponse.userId)
    setUserDataReply(userResponse);
  }

  const getUserSession = async (userDataId) => {
    try {
      const response = await api.getSession();
      if (response.data.data._id === userDataId)
        setUserSession(true);
    } catch (err) { }
  }

  const getSubCommits = async (commitId, page) => {
    const params = {
      commitId,
      page
    }
    const response = await api.getCommits(params)
    setSubCommits(response.data.data);
  }

  const updateSubcommits = async () => {
    const params = {
      commitId: commitData._id,
      page
    }
    const response = await api.getCommits(params)
    setSubCommits([...subCommits, ...response.data.data]);
  }

  const deleteCommit = async () => {
    try {
      await api.deleteCommits(commitData._id);
      const navigateRouting = commitData.commitId ? `/commit/${commitData.commitId}` : '/home'
      navigate(navigateRouting);
    } catch (err) { }

  }

  return (
    <MainContainer flex>
      <Navbar showModal={setShowModal} />
      <Container
        ref={divRef}
        flex w={'100%'}
        of_y={'auto'}
        onScroll={() => infiniteScroll(divRef, page, setPage)}
      >
        <PostView>
          <Container flex fd={'column'} >
            <AiOutlineArrowLeft onClick={() => navigate(-1)} style={{ cursor: 'pointer' }} />
            <Container postUD flex ai={'center'} jc={'space-between'} >
              <Container postUD flex ai={'center'}>
                <CgProfile size={25} />
                <Container postUD >
                  <Link to={`/user/${userData._id}`}>
                    <ForthlyTitle>{userData.name}</ForthlyTitle>
                    <FifthlyTitle>{usernameFormatter(userData.username)}</FifthlyTitle>
                  </Link>
                </Container>
              </Container>
              {
                userSession ?
                  <BsTrash size={20} style={{ cursor: 'pointer' }} onClick={deleteCommit} />
                  : null
              }
            </Container>
            <Container>
              <p>{commitData.content}</p>
            </Container>
            <Container flex jc={'space-between'} m={'30px 0 15px 0'}>
              <FifthlyTitle>{dateTimeFormatter(commitData.creationDate)}</FifthlyTitle>
              {commitData.commitId ?
                <p>Reply from <Link to={`/commit/${commitData.commitId}`}>{usernameFormatter(userDataReply.username)}</Link></p>
                : null
              }
            </Container>
            <hr color="#121927" />
            <Container flex jc={'space-between'} m={'10px 0 15px 0'} >
              <Container postUD flex ai={'center'} >
                <BiGitCommit size={25} />
                {commitData.commitNumber}
              </Container>
            </Container>
            <hr color="#121927" />
            <CreateCommit commitId={commitData._id} getData={getCommit} />
            {
              subCommits.map((data) =>
                <Card key={data._id}>
                  <Commit data={data} />
                </Card>
              )
            }
          </Container>
        </PostView>
      </Container>
      {showModal ? <Modal><LogOut closeModal={setShowModal} /></Modal> : null}
    </MainContainer >
  )
}

export default ViewCommit
