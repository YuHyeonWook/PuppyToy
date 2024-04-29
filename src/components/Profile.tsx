import '../styles/Profile.scss';
import React from 'react';
import { FaDog, FaBone, FaBookReader, FaRegClock, FaClock } from 'react-icons/fa';
import { ImManWoman } from 'react-icons/im';
import userProfileBackgroundImage from '../assets/user_profile_background_image.jpg';

const Profile = ({ userData }) => {
  return (
    <div className="user-profile">
      <div className="inner">
        <header>
          <div
            className="user-profile__background"
            style={{ backgroundImage: `url(${userProfileBackgroundImage})` }}></div>
          <div className="user-profile__image">
            <img src={userData.imageUrl} alt="User Profile Image" />
          </div>
          <div className="user-profile__name">{userData.name}</div>
        </header>
        <main>
          <div className="user-profile__breed">
            <p className="key">
              <FaDog
                style={{
                  color: '#000',
                }}
              />
              {'품종'}
            </p>
            <p className="value">{userData.breed}</p>
          </div>
          <div className="user-profile__gender">
            <p className="key">
              <ImManWoman
                style={{
                  color: '#000',
                }}
              />
              {'성별'}
            </p>
            <p className="value">{userData.gender}</p>
          </div>
          <div className="user-profile__age">
            <p className="key">
              <FaBone
                style={{
                  color: '#000',
                }}
              />
              {'나이'}
            </p>
            <p className="value">{userData.age}살</p>
          </div>
          <div className="user-profile__position">
            <p className="key">
              <FaBookReader
                style={{
                  color: '#000',
                }}
              />
              {'직책'}
            </p>
            <p className="value">{userData.position}</p>
          </div>
          <div className="user-profile__in-work">
            <p className="key">
              <FaRegClock
                style={{
                  color: '#000',
                }}
              />
              {'등교 시간'}
            </p>
            <p className="value">{userData.inWork}</p>
          </div>
          <div className="user-profile__out-work">
            <p className="key">
              <FaClock
                style={{
                  color: '#000',
                }}
              />
              {'하교 시간'}
            </p>
            <p className="value">{userData.outWork}</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
