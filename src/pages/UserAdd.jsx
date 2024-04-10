// import React, { useEffect, useState } from 'react';
// import { addDoc, collection } from 'firebase/firestore';
// import { db, storage } from '../firebase';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import { toast } from 'react-toastify';
// import '../styles/UserAddStyle.scss';

// const UserAdd = () => {
//   const [newUser, setNewUser] = useState({
//     name: '',
//     gender: '',
//     age: '',
//     breed: '',
//     position: '',
//   });
//   const [file, setFile] = useState('');

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const storageRef = ref(storage, file.name);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       'state_changed',
//       (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log('Upload is ' + progress + '% done');
//       },
//       (error) => {
//         console.error(error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           console.log('File available at', downloadURL);
//           setImage(downloadURL); // 이미지 URL을 상태에 저장합니다.
//         });
//       },
//     );
//   };

//   const handleChange = (e) => {
//     setNewUser({
//       ...newUser,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // 모든 필드가 채워져 있는지 확인합니다.
//     if (Object.values(newUser).every((item) => item !== '')) {
//       try {
//         // 모든 필드가 채워져 있으면 Firebase에 문서를 추가합니다.
//         await addDoc(collection(db, 'newUsers'), newUser);
//         setNewUser({
//           name: '',
//           gender: '',
//           age: '',
//           breed: '',
//           position: '',
//         });
//       } catch (error) {
//         // 문서 추가 중 에러가 발생하면 에러를 출력.
//         console.error('Error adding document: ', error);
//       }
//     } else {
//       // 하나 이상의 필드가 빈 문자열인 경우 에러 메시지를 출력.
//       console.error('빈칸을 모두 채워주세요.');
//     }
//   };

//   return (
//     <>
//       <form className="userForm" onSubmit={handleSubmit}>
//         <input type="file" onChange={handleImageUpload} />
//         <div className="user__container">
//           <input
//             type="text"
//             name="name"
//             placeholder="이름"
//             value={setNewUser.name}
//             onChange={handleChange}
//           />
//           <select
//             className="gender-select"
//             name="gender"
//             value={setNewUser.gender}
//             onChange={handleChange}>
//             <option value="">Select gender...</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>
//           <input
//             type="number"
//             name="age"
//             placeholder="나이"
//             value={setNewUser.age}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="breed"
//             placeholder="품종"
//             value={setNewUser.breed}
//             onChange={handleChange}
//           />
//           <select name="position" value={setNewUser.position} onChange={handleChange}>
//             <option value="">직책</option>
//             <option value="leader">리더</option>
//             <option value="sub-leader">부반장</option>
//             <option value="member">유치원생</option>
//           </select>
//         </div>
//         <div className="btn__container">
//           <button>추가</button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default UserAdd;

// ----  2번쨰 시도 코드 contextapi 사용---

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiUser } from 'react-icons/fi';
import { UserContext } from '../components/UserContext';

const UserAdd = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    gender: '',
    age: '',
    breed: '',
    position: '',
    imageUrl: '',
  });
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const uploadFile = useCallback(() => {
    if (file) {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info('Image upload to firebase successfully', {
              autoClose: 2000,
            });
            setNewUser((prev) => ({ ...prev, imageUrl: downloadUrl }));
          });
        },
      );
    }
  }, [file]);

  useEffect(() => {
    uploadFile();
  }, [uploadFile]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(newUser).some((item) => item === '')) {
      alert('모든 필드를 채워주세요.');
    } else {
      try {
        // Firebase에 유저 데이터 저장
        const docRef = await addDoc(collection(db, 'newUsers'), newUser);
        // 저장된 유저 데이터를 App 컴포넌트의 전역 상태에 저장
        setUser({ id: docRef.id, ...newUser });
        setNewUser({
          name: '',
          gender: '',
          age: '',
          breed: '',
          position: '',
          imageUrl: '',
        });
        toast.success('newUser created successfully', {
          autoClose: 1000,
        });
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } catch (error) {
        console.error('Error adding document: ', error);
        toast.error('Error creating newUser', {
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <form className="userForm" onSubmit={handleSubmit}>
        <div className="user__container">
          <label htmlFor="file-upload" className="custom-file-upload">
            {newUser.imageUrl ? (
              <img src={newUser.imageUrl} alt="newUser" width={50} height={50} />
            ) : (
              <FiUser size={50} />
            )}
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={newUser.name}
            onChange={handleChange}
          />
          <select
            className="gender-select"
            name="gender"
            value={newUser.gender}
            onChange={handleChange}>
            <option value="">Select gender...</option>
            <option value="male">수컷</option>
            <option value="female">암컷</option>
          </select>
          <input
            type="number"
            name="age"
            placeholder="나이"
            value={newUser.age}
            onChange={handleChange}
          />
          <input
            type="text"
            name="breed"
            placeholder="품종"
            value={newUser.breed}
            onChange={handleChange}
          />
          <select name="position" value={newUser.position} onChange={handleChange}>
            <option value="">직책</option>
            <option value="leader">리더</option>
            <option value="sub-leader">부반장</option>
            <option value="member">유치원생</option>
          </select>
        </div>
        <div className="btn__container" type="submit" disabled={progress !== 100}>
          <button>추가</button>
        </div>
      </form>
    </>
  );
};

export default UserAdd;
