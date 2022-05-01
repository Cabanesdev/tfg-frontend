import {getSession, deleteSession} from './localstorage'

const checkSession = (navigate) => {
  const token = getSession()
  if(!token) navigate('/auth')
}

const logOut = (navigate) => {
  deleteSession();
  navigate('/auth');
}

export {checkSession, logOut}
