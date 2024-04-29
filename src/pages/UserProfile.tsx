import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Profile from '../components/Profile';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Footer from '../components/Footer';

export const UserProfile = () => {
  const [userData, setUserData] = useState('');

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
      {userData && <Profile userData={userData} />}
      <Footer />
    </>
  );
};
