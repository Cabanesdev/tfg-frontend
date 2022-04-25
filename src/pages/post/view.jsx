import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { CgProfile } from 'react-icons/cg'
import Api from "../../utils/api";
import { datePostFormatter, usernameFormatter } from "../../utils/formatters";
import Navbar from "../../components/navbar"
import { Container, MainContainer, PostView } from "../../components/styled/div"
import { FifthlyTitle, ForthlyTitle, MainTitle } from "../../components/styled/title"

function ViewPost() {
  const [postData, setPostData] = useState({})
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
  }

  const getUserData = async (userId) => {
    const response = await api.getUserById(userId)
    setUserData(response.data.data)
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
          <MainTitle fs={'24px'} m={'15px 0 0 0'}> {postData.title} </MainTitle>
        </PostView>
      </Container>
    </MainContainer>
  )
}

export default ViewPost
