import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { UserContext } from '../components/UserContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(db, 'newUsers', user.id); // Assuming 'id' is unique
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.log('No such user!');
        }
      }
    };
    fetchUserData();
  }, [user]);

  return (
    <>
      <Header />
      {userData ? (
        <div>
          <img src={userData.imageUrl} alt="User" />
          <p>Name: {userData.name}</p>
          <p>Gender: {userData.gender}</p>
          <p>Age: {userData.age}</p>
          <p>Breed: {userData.breed}</p>
          <p>Position: {userData.position}</p>
        </div>
      ) : (
        <div>Empty...</div>
      )}
    </>
  );
};

export default UserProfile;
