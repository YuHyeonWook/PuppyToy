import { FaDog, FaBone, FaBookReader, FaRegClock, FaClock } from 'react-icons/fa';
import { ImManWoman } from 'react-icons/im';
import userProfileBackgroundImage from '../assets/user_profile_background_image.jpg';
import '@styles/Profile.scss';
import { UserType } from '../lib/types/UserTypes';

const Profile: React.FC<{ userData: UserType }> = ({ userData }) => {
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
              <FaDog />
              {'품종'}
            </p>
            <p className="value">{userData.breed}</p>
          </div>
          <div className="user-profile__gender">
            <p className="key">
              <ImManWoman />
              {'성별'}
            </p>
            <p className="value">{userData.gender}</p>
          </div>
          <div className="user-profile__age">
            <p className="key">
              <FaBone />
              {'나이'}
            </p>
            <p className="value">{userData.age}살</p>
          </div>
          <div className="user-profile__position">
            <p className="key">
              <FaBookReader />
              {'직책'}
            </p>
            <p className="value">{userData.position}</p>
          </div>
          <div className="user-profile__in-work">
            <p className="key">
              <FaRegClock />
              {'등교 시간'}
            </p>
            <p className="value">{userData.inWork}</p>
          </div>
          <div className="user-profile__out-work">
            <p className="key">
              <FaClock />
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
