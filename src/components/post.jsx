import { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaRegComment } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Api from '../utils/api.js'
import { dateFormatter, usernameFormatter } from '../utils/formatters.js'
import { Container } from './styled/div'
import { FifthlyTitle, ForthlyTitle, MainTitle } from './styled/title'

function Post({ data }) {
  const [userData, setUserData] = useState({})

  useEffect(() => {
    getUserData()
  }, [])

  const getUserData = async () => {
    try {
      const api = new Api();
      const response = await api.getUserById(data.userId)
      setUserData(response.data.data)
    } catch (err) {
      if (err.response) { }
    }
  }

  return (
    <Container flex fd={'column'} p={'20px'}>
      <Container postUD flex ai={'center'}>
        <CgProfile size={25} />
        <Container postUD  >
          <Link to={`/user/${userData._id}`}>
            <ForthlyTitle>{userData.name}</ForthlyTitle>
            <FifthlyTitle>{usernameFormatter(userData.username)}</FifthlyTitle>
          </Link>
        </Container>
      </Container>
      <Container p={'0 0 0 40px'}>
        <Link to={`/post/${data._id}`}>
          <MainTitle fs={'1.3rem'} post>{data.title}</MainTitle>
        </Link>
        <Container flex jc={'space-between'} m={'10px 0 0 0'} >
          <Container postUD flex ai={'center'} >
            <FaRegComment size={15} />
            {data.comments}
          </Container>
          <Container flex ai={'center'} >
            {dateFormatter(data.creationDate)}
          </Container>
        </Container>
      </Container>
    </Container>
  )
}

export default Post
