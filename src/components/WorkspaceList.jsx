import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { getFirestore, collection, query, where, onSnapshot, Timestamp } from 'firebase/firestore';
import '../styles/WorkspaceApplication.scss';

const WorkspaceList = ({ attendance, onItemClick }) => {
  const db = getFirestore();
  const [listData, setListData] = useState([]);

  useEffect(() => {
    let unsub, q;
    //오늘 날짜 포함, new Date()를 하면 시간 때문에 오늘 날짜임에도 보이지 않음
    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (attendance) {
      q = query(
        collection(db, 'absent'),
        where('attendance', '==', attendance),
        where('date', '>=', Timestamp.fromDate(todayDate)),
      );
      unsub = onSnapshot(q, (doc) => {
        setListData(doc.docs);
      });
    } else {
      q = query(collection(db, 'absent'), where('date', '>=', Timestamp.fromDate(todayDate)));
      unsub = onSnapshot(q, (doc) => {
        setListData(doc.docs);
      });
    }
    return () => unsub();
  }, [db, attendance]);

  return (
    <div className="workspace">
      <div className="list">
        {listData.map((data) => (
          <div className="list__container" key={data.id} onClick={() => onItemClick(data.data())}>
            <div className="list__name">{data.data().name}</div>
            <div className="list__attendance">{data.data().attendance}</div>
            <div className="list__date">
              {format(data.data().date.toDate(), 'yyyy년 MM월 dd일')}
            </div>
            <div className="list__under"></div>
            <div className="list__reason">{data.data().reason}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceList;
