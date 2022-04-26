import { CgProfile } from 'react-icons/cg'
import { datePostFormatter } from '../utils/formatters'
import { CommentContainer, Container } from './styled/div'
import { ForthlyTitle, FifthlyTitle } from './styled/title'

function ViewComment({ userData, commentData }) {
  return (
    <CommentContainer>
      <Container postUD flex ai={'center'}>
        <CgProfile size={25} />
        <Container postUD >
          <ForthlyTitle>{userData.name}</ForthlyTitle>
          <FifthlyTitle>Posted on {datePostFormatter(commentData.creationDate)}</FifthlyTitle>
        </Container>
      </Container>
      <Container m={'10px'}><p>{commentData.content}</p></Container>
    </CommentContainer>
  )

}

export default ViewComment
