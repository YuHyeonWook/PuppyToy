import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { getAuth } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { LuDog } from 'react-icons/lu';
import { UserContext } from '../components/userContext';
import Dropdown from '../common/Dropdown';
import { getCurrentDate } from '../lib/utils/getCurrentDate';
import 'react-toastify/dist/ReactToastify.css';
import '@styles/UserAdd.scss';
import '@styles/Loading.scss';

const date = getCurrentDate();

export const UserAdd = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    gender: '',
    age: 0,
    breed: '',
    position: '',
    imageUrl: '',
    inWork: '-- : -- : --',
    outWork: '-- : -- : --',
    workDate: date,
  });

  const [file, setFile] = useState('');
  const [progress, setProgress] = useState(0);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const uploadFile = useCallback(() => {
    if (file) {
      uploadFileToStorage();
    }
  }, [file]);

  const uploadFileToStorage = () => {
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        updateUploadProgress(snapshot);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          onUploadSuccess(downloadUrl);
        });
      },
    );
  };

  const updateUploadProgress = (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    setProgress(progress);
    updateUploadStatus(snapshot.state);
  };

  const updateUploadStatus = (state) => {
    switch (state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      default:
        break;
    }
  };

  const onUploadSuccess = (downloadUrl) => {
    toast.info('이미지 업로드 성공!!', {
      autoClose: 2000,
    });
    setNewUser((prev) => ({ ...prev, imageUrl: downloadUrl }));
  };

  useEffect(() => {
    uploadFile();
  }, [uploadFile]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleChange = (e) => {
    setNewUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyFields = Object.entries(newUser).filter(
      ([key, value]) => value === '' || value === 0,
    );
    if (emptyFields.length > 0) {
      toast.info(`다음 필드를 채워주세요: ${emptyFields.map(([key]) => key).join(', ')}`, {
        autoClose: 2000,
      });
    } else {
      try {
        const auth = getAuth();
        const uid = auth.currentUser.uid;
        // Firebase에 유저 데이터 저장
        await setDoc(doc(db, 'newUsers', uid), newUser);
        // localStorage에 유저 데이터 저장
        localStorage.setItem('user', JSON.stringify({ id: uid, ...newUser }));
        // 저장된 유저 데이터를 App 컴포넌트의 전역 상태에 저장
        setUser({ id: uid, ...newUser });
        navigate('/home');
      } catch (error) {
        console.error('Error adding document: ', error);
        toast.error('Error creating newUser', {
          autoClose: 2000,
        });
      }
    }
  };

  const handleDropdownValueUpdate = (name) => (value) => {
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <ToastContainer />
      <form className="userForm" onSubmit={handleSubmit}>
        <div className="user__container">
          <label htmlFor="file-upload" className="customFile--upload">
            {newUser.imageUrl ? (
              <img src={newUser.imageUrl} alt="newUser" width={100} height={100} />
            ) : (
              <LuDog size={60} />
            )}
          </label>
          <input id="file-upload" type="file" onChange={handleFileUpload} />
          <input
            className="userAdd__input"
            type="text"
            name="name"
            placeholder="이름"
            value={newUser.name}
            onChange={handleChange}
          />
          <Dropdown
            list={['수컷', '암컷']}
            onValueChange={handleDropdownValueUpdate('gender')}
            placeholder={'성별'}
          />
          <input
            className="userAdd__input"
            type="number"
            name="age"
            placeholder="나이"
            value={newUser.age}
            onChange={handleChange}
          />
          <input
            className="userAdd__input"
            type="text"
            name="breed"
            placeholder="품종"
            value={newUser.breed}
            onChange={handleChange}
          />
          <Dropdown
            list={['반장', '부반장', '유치원생']}
            onValueChange={handleDropdownValueUpdate('position')}
            placeholder={'직책'}
          />
          <div className="btn__container" type="submit" disabled={progress !== 100}>
            <button className="userAdd--btn">추가</button>
          </div>
        </div>
      </form>
    </>
  );
};
