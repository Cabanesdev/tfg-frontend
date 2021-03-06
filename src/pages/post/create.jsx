import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Api from "../../utils/api"
import { Container, MainContainer, MDEditorStyled } from "../../components/styled/div"
import { CreatePostButton } from "../../components/styled/button"
import { CreateTextArea } from "../../components/styled/textarea"
import { getSession } from "../../utils/localstorage";

function CreatePost() {
  const [value, setValue] = useState()
  const titleRef = useRef({})
  const navigate = useNavigate()

  useEffect(() => {
    const token = getSession();
    if (!token) navigate('/');
  }, [])

  const changeTextArea = () => {
    titleRef.current.style.height = 'auto';
    titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
  };

  const createPost = async () => {
    try {
      const api = new Api()
      const data = {
        title: titleRef.current.value,
        content: value
      }

      const response = await api.createPost(data)
      toast.success(response.data.data, {
        autoClose: 1500,
        pauseOnHover: false,
      })

      setTimeout(() => navigate('/'), 2000)

    } catch (err) {
      if (err.response) toast.error(err.response.data.data, {
        autoClose: 2000,
        pauseOnHover: false,
      })
    }

  }

  return (
    <MainContainer flex fd={'column'} jc={'center'} ai={'center'}>
      <Container create fd={'column'} w={'80%'} h={'100%'} m={'20px 0 0 0'} of_y={'auto'} mw={'1000px'}>
        <CreateTextArea
          ref={titleRef}
          onChange={changeTextArea}
          placeholder="New Post Title here..." />
        <hr color='3A3C3D' />
        <Container h={'82%'}>
          <MDEditorStyled
            value={value}
            onChange={setValue}
            preview={'edit'}
            height={'90%'}
            textareaProps={{ height: '100%', placeholder: 'New Post Content here...' }} />
        </Container>
      </Container>
      <Container postUD flex jc={'flex-end'} w={'80%'} mw={'1000px'}>
        <CreatePostButton onClick={() => { navigate('/') }}>Discard</CreatePostButton>
        <CreatePostButton onClick={createPost}>Create</CreatePostButton>
      </Container>
      <ToastContainer theme="dark" />
    </MainContainer>
  )

}

export default CreatePost
