import { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaRegComment } from 'react-icons/fa'
import { Container } from './styled/div'
import Api from '../utils/api.js'
import { usernameFormatter } from '../utils/formatters.js'

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
        <Container postUD >
          <h4>{userData.name}</h4>
          <h5>{usernameFormatter(userData.username)}</h5>
        </Container>
      </Container>
      <Container p={'0 0 0 40px'}>
        <h1>{data.title}</h1>
        <Container flex m={'10px 0 0 0'}>
            <Container flex ai={'center'} postUD>
              <FaRegComment size={15}/>
              {'89 comments'}
            </Container>
        </Container>
      </Container>
    </Container>
  )
}

export default Post
