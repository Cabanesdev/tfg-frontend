import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactMarkDown from "react-markdown"
import { CgProfile } from 'react-icons/cg'

import Api from "../../utils/api";
import { datePostFormatter } from "../../utils/formatters";
import Navbar from "../../components/navbar"
import CreateComment from "../../components/createComment"
import ViewComment from "../../components/viewComment"
import Modal from '../../components/modal';
import LogOut from '../../components/logOut';
import DeletePost from '../../components/deletePost';

import { Container, MainContainer, PostView } from "../../components/styled/div"
import { FifthlyTitle, ForthlyTitle, MainTitle, ThirdlyTitle } from "../../components/styled/title"
import { getSession } from "../../utils/localstorage";
import { BsPencil, BsTrash, BsTree } from "react-icons/bs";

function ViewPost() {
  const [postData, setPostData] = useState({})
  const [userData, setUserData] = useState({})
  const [isOwner, setIsOwner] = useState(false);
  const [commentsData, setCommentsData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const { id } = useParams();
  const api = new Api()

  useEffect(() => {
    getPost();
  }, [id])

  const getPost = async () => {
    const response = await api.getPostById(id)
    if (!response.data.data) return navigate('/')

    setPostData(response.data.data)
    getUserData(response.data.data.userId)

    if (response.data.data.comments > 0)
      getComments(response.data.data._id)

  }

  const getUserData = async (userId) => {
    const { data: { data } } = await api.getUserById(userId)
    setUserData(data);

    const token = getSession()
    if (token) {
      const { data: { data: sessionData } } = await api.getSession(userId)
      if (sessionData._id === data._id) setIsOwner(true);
    }
  }

  const getComments = async (postId) => {
    const params = { postId, page }
    const response = await api.getComments(params)
    setCommentsData(response.data.data)
  }

  const deletePost = async () => {
    try {
      await api.deletePost(postData._id);
      navigate('/home');
    } catch (err) {
      if (err.response) toast.error(err.response.data.data, {
        autoClose: 2000,
        pauseOnHover: false,
      })
    }
  }

  return (
    <MainContainer flex>
      <Navbar showModal={setShowModal} />
      <Container flex w={'100%'} of_y={'auto'}>
        <PostView>
          <Container postUD flex ai={'center'}>
            <CgProfile size={25} />
            <Container postUD >
              <ForthlyTitle>{userData.name}</ForthlyTitle>
              <FifthlyTitle>Posted on {datePostFormatter(postData.creationDate)}</FifthlyTitle>
            </Container>
          </Container>
          <Container flex jc={'space-between'} ai={'center'} m={'15px 0 0 0'}>
            <MainTitle fs={'36px'}> {postData.title} </MainTitle>
            {isOwner ?
              <Container flex jc={'space-between'} w={'50px'} >
                <Link to={`/post/edit/${postData._id}`}>
                  <BsPencil size={20} />
                </Link>
                <BsTrash
                  size={20}
                  onClick={() => {
                    setShowModal(true)
                    setShowDeleteModal(true)
                  }} />
              </Container>
              : null}
          </Container>
          <hr />
          <Container m={'20px 0 0 0'}>
            <ReactMarkDown>{postData.content}</ReactMarkDown>
          </Container>
          <Container m={'50px 0 0 0'}>
            <ThirdlyTitle>{postData.comments} Comments</ThirdlyTitle>
            <hr />
            <CreateComment postId={postData._id} getPost={getPost} />
            {commentsData.length > 0 ?
              (
                <Container m={'15px 0 0 0'}>
                  {commentsData.map((data) => {
                    return <ViewComment key={data._id} userData={userData} commentData={data} />
                  })}
                </Container>
              ) : null}
          </Container>
        </PostView>
      </Container >
      {showModal ?
        <Modal>
          {showDeleteModal ?
            <DeletePost
              closeModal={setShowModal}
              showDelete={setShowDeleteModal}
              deletePost={deletePost}
            />
            : <LogOut closeModal={setShowModal} />}
        </Modal >
        : null}
      <ToastContainer theme="dark" />
    </MainContainer >
  )
}

export default ViewPost
