import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/Header.scss';

const Header = () => {
  return (
    <>
      <nav className="navbar-container">
        <Link className="logo" to="/home">
          logo
        </Link>
        <ul>
          <li>
            <NavLink className="link-style" to="/workspaceApplication">
              근무형태 신청내역
            </NavLink>
          </li>
          <li>
            <NavLink className="link-style" to="/userProfile">
              프로필
            </NavLink>
          </li>
          <li>
            <NavLink className="link-style" to="/gallery">
              공지사항
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
