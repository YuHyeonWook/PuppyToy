import '../styles/Time.scss';
import React, { useEffect, useState } from 'react';

const WorkButton = React.memo(({ inWork }) => {
  return <button type="button">{inWork ? '퇴근 하기' : '출근 하기'}</button>;
});

const Time = () => {
  const [currentTime, setCurrentTime] = useState('00:00:00');
  const [inWork, setInWork] = useState(false);

  useEffect(() => {
    const calculateCurrentTime = () => {
      const date = new Date();
      const timeInUtc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
      const timeInKorea = new Date(timeInUtc + 9 * 60 * 60 * 1000);
      const hours = String(timeInKorea.getHours()).padStart(2, '0');
      const minutes = String(timeInKorea.getMinutes()).padStart(2, '0');
      const seconds = String(timeInKorea.getSeconds()).padStart(2, '0');
      const curTime = hours + ' : ' + minutes + ' : ' + seconds;

      setCurrentTime(curTime);
    };

    const timeCheck = setInterval(calculateCurrentTime, 1000);

    return () => {
      clearInterval(timeCheck);
    };
  }, []);

  return (
    <section className="time">
      <h3>현재 시각</h3>
      <div className="current-time">{currentTime}</div>
      <WorkButton inWork={inWork} />
    </section>
  );
};

export default Time;
