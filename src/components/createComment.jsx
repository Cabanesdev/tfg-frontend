import { useRef, useState } from "react"
import Api from "../utils/api"
import { Container } from "./styled/div"
import { CreateCommentTextArea } from "./styled/textarea"
import { CreateCommentButton } from "./styled/button"

function CreateComment({ postId }) {
  const [value, setValue] = useState(null)
  const textAreaRef = useRef({})

  const handleCreateButton = async () => {
    try{
      const data = {
        postId,
        content: textAreaRef.current.value
      };
      const api = new Api()
      await api.createComment(data)
      setValue('')
      textAreaRef.current.value = ''
      
    }catch(err) {
      if(err.response) console.log(err.response.data.data)
    }
  
  }

  const handleTextAreaOnChange = () => {
    setValue(textAreaRef.current.value)
  }

  return (
    <Container createComment w={'100%'} h={'150px'} m={'10px 0 0 0'} p={'10px'} >
      <CreateCommentTextArea
        ref={textAreaRef}
        onChange={handleTextAreaOnChange}
        placeholder='New Comment here' />
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

export default CreateComment
