import '../styles/TimeModal.scss';
import React from 'react';
import { db } from '../firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const TimeModal = ({ currentTime, inWork, setInWork, outWork, setOutWork, setModalOpen }) => {
  // 등하교 버튼 클릭 시 workTime 수정 및 inWork, outWork 변경
  const handleWorkTime = () => {
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
    setModalOpen(false);
  };

  return (
    <div className="outside" onClick={() => setModalOpen(false)}>
      <div className="time-modal" onClick={(event) => event.stopPropagation()}>
        <h3>현재 시각</h3>
        <div className="current-time">{currentTime}</div>
        <p className="description">
          {inWork ? (outWork ? '이미 하교하셨습니다.' : '하교하시겠습니까?') : '등교하시겠습니까?'}
        </p>
        <div className="btns">
          <button
            className="btn"
            type="button"
            onClick={() => handleWorkTime()}
            disabled={inWork && outWork}>
            {inWork ? (outWork ? '하교 완료' : '하교 하기') : '등교 하기'}
          </button>
          <button className="btn btn--exit" type="button" onClick={() => setModalOpen(false)}>
            취소 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeModal;
