import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import ReactMarkDown from "react-markdown"
import { CgProfile } from 'react-icons/cg'
import Api from "../../utils/api";
import { datePostFormatter } from "../../utils/formatters";
import Navbar from "../../components/navbar"
import CreateComment from "../../components/createComment"
import ViewComment from "../../components/viewComment"

import { Container, MainContainer, PostView, CommentContainer } from "../../components/styled/div"
import { FifthlyTitle, ForthlyTitle, MainTitle, ThirdlyTitle } from "../../components/styled/title"

function ViewPost() {
  const [postData, setPostData] = useState({})
  const [commentsData, setCommentsData] = useState([])
  const [page, setPage] = useState(1)
  const [userData, setUserData] = useState({})
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
    if (response.data.data.comments > 0) {
      getComments(response.data.data._id)
    }
  }

  const getUserData = async (userId) => {
    const response = await api.getUserById(userId)
    setUserData(response.data.data)
  }

  const getComments = async (postId) => {
    const params = { postId, page }
    const response = await api.getComments(params)
    setCommentsData(response.data.data)
  }

  return (
    <MainContainer flex>
      <Navbar />
      <Container flex w={'80%'}>
        <PostView>
          <Container postUD flex ai={'center'}>
            <CgProfile size={25} />
            <Container postUD >
              <ForthlyTitle>{userData.name}</ForthlyTitle>
              <FifthlyTitle>Posted on {datePostFormatter(postData.creationDate)}</FifthlyTitle>
            </Container>
          </Container>
          <MainTitle fs={'36px'} m={'15px 0 0 0'}> {postData.title} </MainTitle>
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
      </Container>
    </MainContainer>
  )
}

export default ViewPost
