import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Api from "../utils/api"
import { Container } from "./styled/div"
import { CreateCommentTextArea } from "./styled/textarea"
import { CreateCommentButton } from "./styled/button"
import { getSession } from "../utils/localstorage"

function CreateCommit({ commitId, getData }) {
  const [value, setValue] = useState(null)
  const navigate = useNavigate()
  const textAreaRef = useRef({})

  const handleCreateButton = async () => {
    try {
      const token = getSession();
      if (!token) navigate('/auth');

      const data = {
        content: textAreaRef.current.value
      };

      if (commitId) data.commitId = commitId
      const api = new Api()
      await api.createCommit(data);
      getData()
      textAreaRef.current.value = ''

    } catch (err) {
      if (err.response) console.log(err.response.data.data)
    }

  }

  const handleTextAreaOnChange = () => {
    setValue(textAreaRef.current.value)
  }

  return (
    <Container createCommit h={'150px'} m={'10px 0 0 0'} p={'10px'} >
      <CreateCommentTextArea
        ref={textAreaRef}
        onChange={handleTextAreaOnChange}
        placeholder='Whats happening?' />
      <Container flex jc={'flex-end'} w={'100%'} h={'18%'} >
        {value ?
          <CreateCommentButton
            onClick={handleCreateButton}
          >
            Create
          </CreateCommentButton>
          : <CreateCommentButton disabled>
            Create
          </CreateCommentButton>
        }
      </Container>
    </Container>
  )
}

export default CreateCommit
