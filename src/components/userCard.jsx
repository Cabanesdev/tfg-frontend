import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import { usernameFormatter } from '../utils/formatters.js'
import { Container } from './styled/div'
import { FifthlyTitle, ForthlyTitle } from './styled/title'

function UserCard({ data }) {

  return (
    <Container flex fd={'column'} p={'20px'}>
      <Container postUD flex ai={'center'}>
        <CgProfile size={25} />
        <Container postUD  >
          <Link to={`/user/${data._id}`}>
            <ForthlyTitle>{data.name}</ForthlyTitle>
            <FifthlyTitle>{usernameFormatter(data.username)}</FifthlyTitle>
          </Link>
        </Container>
      </Container>
      <p>{data.biography}</p>
    </Container >
  )
}

export default UserCard

