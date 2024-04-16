import '../styles/Time.scss';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Time = () => {
  const [currentTime, setCurrentTime] = useState('-- : -- : --'); // 현재 시간
  const [inWork, setInWork] = useState(false); // 출근 여부
  const [outWork, setOutWork] = useState(false); // 퇴근 여부

  // 한국 기준 Date 객체 반환
  const getTimeInKorea = () => {
    const date = new Date();
    const timeInUtc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
    const timeInKorea = new Date(timeInUtc + 9 * 60 * 60 * 1000);

    return timeInKorea;
  };

  // Date 객체에서 'HH : MM : SS' 추출해서 반환
  const getTimeString = (date) => {
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

  // 출퇴근 버튼 클릭 시 workTime 수정 및 inWork, outWork 변경
  const handleClick = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      const userId = user.uid;
      const userRef = doc(db, 'newUsers', userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        if (!inWork) {
          await updateDoc(userRef, {
            inWork: currentTime,
          });
          setInWork(true);
        }

        if (inWork && !outWork) {
          await updateDoc(userRef, {
            outWork: currentTime,
          });
          setOutWork(true);
        }
      }
    });
  };

  return (
    <section className="time">
      <h3>현재 시각</h3>
      <div className="current-time">{currentTime}</div>
      <button type="button" onClick={handleClick} disabled={inWork && outWork}>
        {inWork ? (outWork ? '퇴근 완료' : '퇴근 하기') : '출근하기'}
      </button>
    </section>
  );
};

export default Time;
