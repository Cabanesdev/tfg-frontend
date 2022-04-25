import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiGitCommit, BiSearch, BiUser } from 'react-icons/bi';
import { BsFilePost, BsPlusCircle } from 'react-icons/bs';
import { FiLogOut, FiLogIn, } from 'react-icons/fi';
import Api from '../utils/api';
import { getSession } from '../utils/localstorage';

import logo from '../assets/icons/logo.png';

import {
  LogoContainer,
  NavbarActionsContainer,
  NavbarContainer,
} from './styled/div';

function Navbar({ showModal, showPosts }) {

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const token = getSession()
    if (token) getUserSession()

  }, [])


  const getUserSession = async () => {
    try {
      const api = new Api()
      const response = await api.getSession()
      setUserData(response.data.data)
    } catch (err) {
       return
    }
  }

  return (
    <NavbarContainer>
      <LogoContainer>
        <Link to="/">
          <img src={logo} alt="Codex logo" />
        </Link>
      </LogoContainer>
      <NavbarActionsContainer>
        {userData ? (
          <>
            <Link to='/'>
              <BiSearch size={25} />
            </Link>
            <Link to={`/user/${userData._id}`}>
              <BiUser size={30}  />
            </Link>
            <FiLogOut
              size={30}
              style={{ color: 'white' }}
              onClick={() => showModal(true)}
            />
            <Link to='/post/create'>
              <BsPlusCircle size={25} style={{ color: 'white' }} />
            </Link>
          </>
        ) : (
          <Link to='/auth'>
            <FiLogIn size={30} style={{ color: 'white' }} />
          </Link>
        )}
      </NavbarActionsContainer>
    </NavbarContainer>
  );
};

export default Navbar;
