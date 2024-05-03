import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import logo from '../assets/logo/HeaderLogo.png';
import '@styles/Header.scss';
import SingOut from './SingOut';

const Header = () => {
  const { user } = useContext(UserContext); // UserContext의 값을 가져옴
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar__container">
        <Link className="logo" to="/home">
          <img src={logo} alt="logo" />
        </Link>
        <ul>
          <li>
            <NavLink className="link--style" to="/workspaceApplication">
              결석 신청내역
            </NavLink>
          </li>
          <li>
            <NavLink className="link--style" to="/userProfile">
              프로필
            </NavLink>
          </li>
          <li>
            <NavLink className="link--style" to="/gallery">
              갤러리
            </NavLink>
          </li>
          <li>
            {user && (
              <div className="user--info" onClick={() => navigate('/userprofile')}>
                <img src={user.imageUrl} />
                <span>{user.name}님</span>
              </div>
            )}
          </li>
          <li>
            <SingOut />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
