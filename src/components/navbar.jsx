import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

function Navbar({ showModal, isHomePage, isPostsActive, setIsPostsActive }) {
  const [userData, setUserData] = useState({})

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
        <Link to='/search'>
          <BiSearch size={25} />
        </Link>
        {isHomePage ? (
          <>
            <BsFilePost
              size={25}
              style={{ color: isPostsActive ? 'var(--primary-color)' : 'white', cursor: 'pointer' }}
              onClick={() => setIsPostsActive(true)}
            />
            <BiGitCommit
              size={30}
              style={{ color: isPostsActive ? 'white' : 'var(--primary-color)', cursor: 'pointer' }}
              onClick={() => setIsPostsActive(false)}
            />
          </>
        ) : null}
        {userData._id ? (
          <>
            <Link to={`/user/${userData._id}`}>
              <BiUser size={30} />
            </Link>
            <FiLogOut
              size={30}
              style={{ color: 'white', cursor: 'pointer' }}
              onClick={() => showModal(true)}
            />
            <Link to='/post/new'>
              <BsPlusCircle size={25} style={{ color: 'white' }} />
            </Link>
          </>
        ) : (
          <Link to='/auth'>
            <FiLogIn size={30} style={{ color: 'white', cursor: 'pointer' }} />
          </Link>
        )}
      </NavbarActionsContainer>
    </NavbarContainer>
  );
};

export default Navbar;
