import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Api from '../utils/api';

import { Container, EditInputContainer, EditUserContainer, ModalContainer } from './styled/div'
import { SecondaryTitle } from './styled/title';
import { EditProfileButton } from './styled/button';
import { EditInput } from './styled/input';
import { EditUserTextArea } from './styled/textarea';


function EditUser({ close }) {
  const [userData, setUserData] = useState({});
  let nameRef = useRef({});
  let usernameRef = useRef({});
  let emailRef = useRef({});
  let biographyRef = useRef({});
  let webpageRef = useRef({});
  let linkedinRef = useRef({});
  let githubRef = useRef({});
  const api = new Api();

  useEffect(() => {
    getUserSession();
  }, [])

  const getUserSession = async () => {
    const response = await api.getSession();
    setUserData(response.data.data);
  }

  const getNewUserData = () => {
    const newUserData = {};
    if (nameRef.current.value.trim() !== userData.name && nameRef.current.value !== '')
      newUserData.name = nameRef.current.value.trim()

    if (usernameRef.current.value.trim() !== userData.username && usernameRef.current.value !== '')
      newUserData.username = usernameRef.current.value.trim()

    if (emailRef.current.value.trim() !== userData.email && emailRef.current.value !== '')
      newUserData.email = emailRef.current.value.trim()

    if (biographyRef.current.value.trim() !== userData.biography)
      newUserData.biography = biographyRef.current.value.trim()

    if (webpageRef.current.value.trim() !== userData.webpage)
      newUserData.webpage = webpageRef.current.value.trim()

    if (linkedinRef.current.value.trim() !== userData.linkedinRef)
      newUserData.linkedin = linkedinRef.current.value.trim()

    if (githubRef.current.value.trim() !== userData.github)
      newUserData.github = githubRef.current.value.trim()

    return newUserData;
  }

  const updateUser = async () => {
    try {
      const newUserData = getNewUserData();
      if (Object.keys(newUserData).length === 0) return;

      await api.updateUser(newUserData);
      window.location.reload();

    } catch (err) {
      if (err.response)
        toast.error(err.response.data.data, {
          autoClose: 1500, pauseOnHover: false
        })
    }
  }

  return (
    <ModalContainer>
      <EditUserContainer>
        <Container flex fd={'column'} h={'100%'} w={'100%'} >
          <Container bb flex jc={'space-between'} ai={'center'} p={'5px'} >
            <AiOutlineClose
              size={20}
              onClick={() => close(false)}
              style={{ color: 'white' }}
            />
            <Container w={'55%'}>
              <SecondaryTitle c={'var(--primary-color)'}>Edit User</SecondaryTitle>
            </Container>
            <EditProfileButton onClick={updateUser}>Save</EditProfileButton>
          </Container>
          <Container p={'10px 0 0 0'} of_y={'auto'}>
            <EditInputContainer>
              <span>Name</span>
              <EditInput defaultValue={userData.name} ref={nameRef} />
            </EditInputContainer>
            <EditInputContainer>
              <span>Username</span>
              <EditInput defaultValue={userData.username} ref={usernameRef} />
            </EditInputContainer>
            <EditInputContainer>
              <span>Email</span>
              <EditInput defaultValue={userData.email} ref={emailRef} />
            </EditInputContainer>
            <EditInputContainer>
              <span>Biography</span>
              <EditUserTextArea defaultValue={userData.biography} ref={biographyRef} />
            </EditInputContainer>
            <EditInputContainer>
              <span>Webpage</span>
              <EditInput defaultValue={userData.webpage} ref={webpageRef} />
            </EditInputContainer>
            <EditInputContainer>
              <span>LinkedIn</span>
              <EditInput defaultValue={userData.linkedin} ref={linkedinRef} />
            </EditInputContainer>
            <EditInputContainer>
              <span>Github</span>
              <EditInput defaultValue={userData.github} ref={githubRef} />
            </EditInputContainer>
          </Container>
        </Container>
      </EditUserContainer>
      <ToastContainer theme="dark" />
    </ModalContainer >
  )
}

export default EditUser
