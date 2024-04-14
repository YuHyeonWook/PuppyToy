import { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LuDog } from 'react-icons/lu';
import { UserContext } from '../components/UserContext';
import ComonDropdown from '../components/CommonDropdown';
import '../styles/UserAddStyle.scss';
import '../styles/LoadingStyle.scss';

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
  const [isLoading, setIsLoading] = useState(false);
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
            toast.info('이미지 업로드 성공!!', {
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
    setNewUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(newUser).some((item) => item === '')) {
      alert('모든 필드를 채워주세요.');
    } else {
      setIsLoading(true);
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
        setTimeout(() => {
          navigate('/home');
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Error adding document: ', error);
        setIsLoading(false);
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
          <ComonDropdown
            list={['male', 'female']}
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
          <ComonDropdown
            list={['leader', 'sub-leader', 'member']}
            onValueChange={handleDropdownValueUpdate('position')}
            placeholder={'직책'}
          />
          <div className="btn__container" type="submit" disabled={progress !== 100}>
            <button className="userAdd--btn">추가</button>
          </div>
        </div>
        {isLoading && (
          <div className="spinner">
            <span className="spinner-inner-1"></span>
            <span className="spinner-inner-2"></span>
            <span className="spinner-inner-3"></span>
          </div>
        )}
      </form>
    </>
  );
};

export default UserAdd;
