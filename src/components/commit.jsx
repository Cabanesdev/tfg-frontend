import { useEffect, useState } from 'react'
import { BiGitCommit } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import Api from '../utils/api.js'
import { dateFormatter, dateTimeFormatter, usernameFormatter } from '../utils/formatters.js'
import { Container } from './styled/div'
import { FifthlyTitle, ForthlyTitle, MainTitle } from './styled/title'

function Commit({ data }) {
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
        <Container flex ai={'center'} >
          {dateTimeFormatter(data.creationDate)}
        </Container>
      </Container>
      <Container p={'0 0 0 40px'}>
        <Link to={`/commit/${data._id}`}>
          <MainTitle fs={'1rem'} post>{data.content}</MainTitle>
        </Link>
        <Container flex jc={'space-between'} m={'10px 0 0 0'} >
          <Container postUD flex ai={'center'} >
            <BiGitCommit size={25} />
            {data.commitNumber}
          </Container>
        </Container>
      </Container>
    </Container>
  )
}

export default Commit
