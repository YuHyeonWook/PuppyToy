import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import '../styles/WorkspaceApplication.scss';

const WorkspaceList = ({ attendance, onItemClick }) => {
  const db = getFirestore();
  const [listData, setListData] = useState([]);

  useEffect(() => {
    let unsub;

    if (attendance) {
      const q = query(collection(db, 'absent'), where('attendance', '==', attendance));
      unsub = onSnapshot(q, (doc) => {
        setListData(doc.docs);
      });
    } else {
      unsub = onSnapshot(collection(db, 'absent'), (doc) => {
        setListData(doc.docs);
      });
    }

    return () => unsub();
  }, [db, attendance]);

  return (
    <div className="inner">
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
