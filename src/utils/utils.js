import {getSession} from './localstorage'

const checkSession = (navigate) => {
  const token = getSession()
  if(!token) navigate('/auth')
}

export {checkSession}
