import '../styles/Time.scss';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

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
    const checkWorkDate = async () => {
      const docRef = doc(db, 'workTime', 'wdPm9QLOre0i3GGpS5LC');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const workTime = docSnap.data();
        const timeInKorea = getTimeInKorea();
        const currentDate = timeInKorea.toISOString().split('T')[0];

        if (new Date(workTime.workDate) < new Date(currentDate)) {
          await updateDoc(docRef, {
            inWork: '-- : -- : --',
            outWork: '-- : -- : --',
            workDate: currentDate,
          });
          setInWork(false);
          setOutWork(false);
        } else {
          if (workTime.inWork !== '-- : -- : --') setInWork(true);
          if (workTime.outWork !== '-- : -- : --') setOutWork(true);
        }
      }
    };

    checkWorkDate();
  }, []);

  // 출퇴근 버튼 클릭 시 workTime 수정 및 inWork, outWork 변경
  const handleClick = async () => {
    const docRef = doc(db, 'workTime', 'wdPm9QLOre0i3GGpS5LC');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (!inWork) {
        await updateDoc(docRef, {
          inWork: currentTime,
        });
        setInWork(true);
      }

      if (inWork && !outWork) {
        await updateDoc(docRef, {
          outWork: currentTime,
        });
        setOutWork(true);
      }
    }
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
