import { useEffect, useState } from 'react';
import '../styles/userProfile.scss';
import React from 'react';
import Header from '../components/Header';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  // 한국 기준 Date 객체 반환
  const getTimeInKorea = () => {
    const date = new Date();
    const timeInUtc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
    const timeInKorea = new Date(timeInUtc + 9 * 60 * 60 * 1000);

    return timeInKorea;
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      const userId = user.uid;
      const userRef = doc(db, 'newUsers', userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const timeInKorea = getTimeInKorea();
        const currentDate = timeInKorea.toISOString().split('T')[0];

        if (new Date(userData.workDate) < new Date(currentDate)) {
          await updateDoc(userRef, {
            inWork: '-- : -- : --',
            outWork: '-- : -- : --',
            workDate: currentDate,
          });
        }

        setUserData(userSnap.data());
      } else {
        console.log('No such user!');
      }
    });
  }, []);

  return (
    <>
      <Header />
      {userData ? (
        <div className="user-profile">
          <header>
            <div className="user-profile__background">
              <img src="" alt="User Profile BG" />
            </div>
            <div className="user-profile__image">
              <img src={userData.imageUrl} alt="User Profile Image" />
            </div>
            <div className="user-profile__name">{userData.name}</div>
          </header>
          <main>
            <div className="user-profile__type">
              <p className="key">{'품종'}</p>
              <p className="value">{userData.breed}</p>
            </div>
            <div className="user-profile__gender">
              <p className="key">{'성별'}</p>
              <p className="value">{userData.gender}</p>
            </div>
            <div className="user-profile__age">
              <p className="key">{'나이'}</p>
              <p className="value">{userData.age}</p>
            </div>
            <div className="user-profile__position">
              <p className="key">{'직책'}</p>
              <p className="value">{userData.position}</p>
            </div>
            <div className="user-profile__time-in-work">
              <p className="key">{'출근 시간'}</p>
              <p className="value">{userData.inWork}</p>
            </div>
            <div className="user-profile__time-out-work">
              <p className="key">{'퇴근 시간'}</p>
              <p className="value">{userData.outWork}</p>
            </div>
          </main>
        </div>
      ) : (
        <div>Empty...</div>
      )}
    </>
  );
};

export default UserProfile;
