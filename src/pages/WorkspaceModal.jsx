import React, { useState } from 'react';
import '../styles/WorkspaceModal.scss';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';

const WorkspaceModal = ({ setModalOpen }) => {
  const [startDate, setStartDate] = useState(new Date());
  const options = [
    { value: '외출', label: '외출' },
    { value: '조퇴', label: '조퇴' },
    { value: '결석', label: '결석' },
  ];

  return (
    <div>
      <div>
        <h1>신청서</h1>
        <span onClick={() => setModalOpen(false)}>X</span>
        {/* 유저 이름 가져오기 */}
        <span>이름</span>
        <input className="name" type="text" />
        <Select className="selectItem" options={options} placeholder="결석형태" />
        <span>날짜</span>
        <DatePicker className="date" selected={startDate} onChange={(date) => setStartDate(date)} />
        <span>사유</span>
        <textarea name="reason" id="reason" cols="60" rows="10"></textarea>
      </div>
    </div>
  );
};

export default WorkspaceModal;
