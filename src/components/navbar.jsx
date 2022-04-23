import { Link } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { BsPlusCircle } from 'react-icons/bs';
import { FiLogOut, FiLogIn, FiRss } from 'react-icons/fi';

import logo from '../assets/icons/logo.png';

import {
  LogoContainer,
  NavbarActionsContainer,
  NavbarContainer,
} from './styled/div';

function Navbar({ user, showModal }) {
  return (
    <NavbarContainer>
      <LogoContainer>
        <Link to="/">
          <img src={logo} alt="Codex logo" />
        </Link>
      </LogoContainer>
      <NavbarActionsContainer>
        {user ? (
          <>
            <Link to={`/user/${user.userId}`}>
              <BiUser size={30} style={{ color: 'white' }} />
            </Link>
            <Link to="/feed">
              <FiRss size={30} style={{ color: 'white' }} />
            </Link>
            <FiLogOut
              size={30}
              style={{ color: 'white' }}
              onClick={() => showModal(true)}
            />
            <Link to="/news/create">
              <BsPlusCircle size={25} style={{ color: 'white' }} />
            </Link>
          </>
        ) : (
          <Link to="/auth">
            <FiLogIn size={30} style={{ color: 'white' }} />
          </Link>
        )}
      </NavbarActionsContainer>
    </NavbarContainer>
  );
};

export default Navbar;
