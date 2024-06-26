import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, UploadTaskSnapshot } from 'firebase/storage';
import { db, storage } from '../firebase';
import { getAuth } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { LuDog } from 'react-icons/lu';
import Dropdown from '../components/common/Dropdown';
import { getCurrentDate } from '../lib/utils/getCurrentDate';
import 'react-toastify/dist/ReactToastify.css';
import { useUserState } from '../lib/hooks/useUserState';
import { FileType, UploadStatusType, UserType } from '../lib/types/UserTypes';
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

  const [file, setFile] = useState<FileType>({ name: '' });
  const [progress, setProgress] = useState<number>(0);
  const { setUserState } = useUserState();
  const navigate = useNavigate();
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const handleUpload = () => {
    if (file) {
      setIsUploaded(true);
      uploadFile();
    }
  };

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
        setIsUploaded(false);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          onUploadSuccess(downloadUrl);
        });
      },
    );
  };

  const updateUploadProgress = (snapshot: UploadTaskSnapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    setProgress(progress);
    updateUploadStatus(snapshot.state);
  };

  const updateUploadStatus = (state: UploadStatusType) => {
    switch (state) {
      case UploadStatusType.PAUSED:
        console.log('Upload is paused');
        break;
      case UploadStatusType.RUNNING:
        console.log('Upload is running');
        break;
      case UploadStatusType.SUCCESS:
        console.log('Upload is success');
        break;
      default:
        break;
    }
  };

  const onUploadSuccess = (downloadUrl: string) => {
    toast.info('이미지 업로드 성공!!', {
      autoClose: 2000,
    });
    setIsUploaded(false);
    console.log(downloadUrl);
    setNewUser((prev) => ({ ...prev, imageUrl: downloadUrl }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setFile(file);
      if (file) {
        toast.info('이미지 등록완료!! 업로드 버튼을 누르시오', {
          autoClose: 2000,
        });
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser((prevUser) => ({ ...prevUser, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emptyFields = Object.entries(newUser).filter(([_, value]) => value === '' || value === 0);
    if (emptyFields.length > 0) {
      toast.info(`다음 필드를 채워주세요: ${emptyFields.map(([key]) => key).join(', ')}`, {
        autoClose: 2000,
      });
    } else {
      try {
        const auth = getAuth();
        if (auth.currentUser) {
          const uid = auth.currentUser.uid;
          // Firebase에 유저 데이터 저장
          await setDoc(doc(db, 'newUsers', uid), newUser);
          // localStorage에 유저 데이터 저장
          localStorage.setItem('user', JSON.stringify({ id: uid, ...newUser }));
          // 저장된 유저 데이터를 App 컴포넌트의 전역 상태에 저장
          setUserState({ id: uid, ...newUser });
          navigate('/home');
        }
      } catch (error) {
        console.error('Error adding document: ', error);
        toast.error('Error creating newUser', {
          autoClose: 2000,
        });
      }
    }
  };

  const handleDropdownValueUpdate = (name: string) => (value: string) => {
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <ToastContainer />
      <form className="userForm" onSubmit={handleSubmit}>
        <div className="user__container">
          <label htmlFor="file-upload" className="customFile--upload">
            {newUser.imageUrl ? (
              <img src={newUser.imageUrl} alt="newUser" className="user--image" />
            ) : (
              <div className="icon-container">
                <LuDog />
              </div>
            )}
          </label>
          <input id="file-upload" type="file" onChange={handleFileUpload} />
          <button className="upload--btn" onClick={handleUpload} disabled={isUploaded}>
            업로드
          </button>
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
          <button className="userAdd--btn" type="submit" disabled={progress !== 100}>
            추가
          </button>
        </div>
      </form>
    </>
  );
};
