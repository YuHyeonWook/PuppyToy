import React, { useState } from 'react';
import '../styles/WorkspaceModal.scss';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';

const WorkspaceModal = ({ setModalOpen }) => {
  const [startDate, setStartDate] = useState(new Date());
  const options = [
    { value: '외출', label: '외출' },
    { value: '조퇴', label: '조퇴' },
    { value: '결석', label: '결석' },
  ];
  const storageItem = localStorage.getItem('user');
  const userItem = JSON.parse(storageItem);

  return (
    <div className="modal-background">
      <div className="modal">
        <h1>신청서</h1>
        <span className="modal-close" onClick={() => setModalOpen(false)}>
          X
        </span>
        <div className="modal__conent">
          <input className="modal__name" type="text" value={userItem.name} readOnly />
          <Select
            className="modal__select"
            options={options}
            placeholder="결석형태"
            theme={(theme) => ({
              ...theme,
              borderRadius: 10,
              colors: { ...theme.colors, primary25: '#e9deff', primary: '#c3a3ff' },
            })}
          />
          <DatePicker
            locale={ko}
            className="modal__date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
          <textarea name="modal__reason" id="reason" cols="60" rows="10"></textarea>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceModal;
