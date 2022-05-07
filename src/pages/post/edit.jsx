import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Api from "../../utils/api"
import { Container, MainContainer, MDEditorStyled } from "../../components/styled/div"
import { CreatePostButton } from "../../components/styled/button"
import { CreateTextArea } from "../../components/styled/textarea"
import { getSession } from "../../utils/localstorage";

function EditPost() {
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const titleRef = useRef({})
  const { id } = useParams()
  const navigate = useNavigate()
  const api = new Api()

  useEffect(() => {
    const token = getSession();
    if (!token) navigate('/');
    getPostData()
  }, [])

  const changeTextArea = () => {
    titleRef.current.style.height = 'auto';
    titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
  };

  const getPostData = async () => {
    const { data: { data } } = await api.getPostById(id);
    setTitle(data.title);
    setContent(data.content);
  }

  const editPost = async () => {
    try {
      const data = {
        title: titleRef.current.value,
        content
      }


      await api.editPost(id, data)
      toast.success('Post Edited Succesfully', {
        autoClose: 1500,
        pauseOnHover: false,
      })

      setTimeout(() => navigate(`/post/${id}`), 2000)

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
          defaultValue={title}
          onChange={changeTextArea}
          placeholder="New Post Title here..." />
        <hr color='3A3C3D' />
        <Container h={'82%'}>
          <MDEditorStyled
            value={content}
            onChange={setContent}
            preview={'edit'}
            height={'90%'}
            textareaProps={{ height: '100%', placeholder: 'New Post Content here...' }} />
        </Container>
      </Container>
      <Container postUD flex jc={'flex-end'} w={'80%'} mw={'1000px'}>
        <CreatePostButton onClick={() => { navigate('/') }}>Discard</CreatePostButton>
        <CreatePostButton onClick={editPost}>Edit</CreatePostButton>
      </Container>
      <ToastContainer theme="dark" />
    </MainContainer>
  )

}

export default EditPost
