import { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Layout } from '../components/layout/Layout';
import { getTimeInKorea } from '../lib/utils/getTimeInKorea';

export const UserProfile = () => {
  const [userData, setUserData] = useState<string>('');

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      let userSnap;
      let userRef;

      if (user) {
        const userId = user.uid;
        userRef = doc(db, 'newUsers', userId);
        userSnap = await getDoc(userRef);
      } else {
        console.log('유저 정보가 로그인 안됨');
        return;
      }

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
      <Layout>{userData && <Profile userData={userData} />}</Layout>
    </>
  );
};
