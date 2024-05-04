import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import TimerModal from './TimerModal';
import '@styles/Time.scss';

const Timer = () => {
  const [currentTime, setCurrentTime] = useState<string>('-- : -- : --'); // 현재 시간
  const [inWork, setInWork] = useState<boolean>(false); // 등교 여부
  const [outWork, setOutWork] = useState<boolean>(false); // 하교 여부
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 한국 기준 Date 객체 반환
  const getTimeInKorea = () => {
    const date = new Date();
    const timeInUtc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
    const timeInKorea = new Date(timeInUtc + 9 * 60 * 60 * 1000);

    return timeInKorea;
  };

  // Date 객체에서 'HH : MM : SS' 추출해서 반환
  const getTimeString = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const timeString = hours + ' : ' + minutes + ' : ' + seconds;
    return timeString;
  };

  // 한국 기준 현재 시간 timer
  useEffect(() => {
    const calculateCurrentTime = () => {
      const timeInKorea = getTimeInKorea();
      const curTime = getTimeString(timeInKorea);
      setCurrentTime(curTime);
    };
    const timeCheck = setInterval(calculateCurrentTime, 1000);
    return () => {
      clearInterval(timeCheck);
    };
  }, []);

  // workDate가 이전 날짜인 경우 workTime 초기화
  // inWork, outWork 초기화
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
          setInWork(false);
          setOutWork(false);
        } else {
          if (userData.inWork !== '-- : -- : --') setInWork(true);
          if (userData.outWork !== '-- : -- : --') setOutWork(true);
        }
      } else {
        console.log('No such user!');
      }
    });
  }, []);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  return (
    <section className="time">
      <h3>현재 시각</h3>
      <div className="current-time">{currentTime}</div>
      <button
        className="btn"
        type="button"
        onClick={handleButtonClick}
        disabled={inWork && outWork}>
        {inWork ? (outWork ? '하교 완료' : '하교 하기') : '등교 하기'}
      </button>
      {modalOpen && (
        <TimerModal
          currentTime={currentTime}
          inWork={inWork}
          setInWork={setInWork}
          outWork={outWork}
          setOutWork={setOutWork}
          setModalOpen={setModalOpen}
        />
      )}
    </section>
  );
};

export default Timer;
