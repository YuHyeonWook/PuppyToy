import React, { useEffect, useState } from 'react';
import '../styles/WorkspaceModal.scss';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { getFirestore, addDoc, collection } from 'firebase/firestore';

const WorkspaceModal = ({ setModalOpen, selectedItem }) => {
  const [schedule, setSchedule] = useState(new Date());
  const [reason, setReason] = useState('');
  const [attendance, setAttendance] = useState('');
  const [selectOption, setSelectOption] = useState('');

  // list 누르면 선택된 모달창에 데이터가  schedule, reason, attendance에 들어가짐
  useEffect(() => {
    if (selectedItem) {
      setSchedule(selectedItem.date.toDate());
      setReason(selectedItem.reason);
      setAttendance(selectedItem.attendance);
      setSelectOption({ value: selectedItem.attendance, label: selectedItem.attendance });
    } else {
      // selectedItem이 null인 경우 상태 값 초기화
      setSchedule(new Date());
      setReason('');
      setAttendance('');
      setSelectOption('');
    }
  }, [selectedItem]);

  const db = getFirestore();
  const options = [
    { value: '외출', label: '외출' },
    { value: '조퇴', label: '조퇴' },
    { value: '결석', label: '결석' },
  ];
  const storageItem = localStorage.getItem('user');
  const userItem = JSON.parse(storageItem);

  const handleSubmit = async () => {
    try {
      if (schedule !== '' && reason !== '' && attendance !== '') {
        const data = {
          id: userItem.id,
          name: userItem.name,
          date: schedule,
          reason: reason,
          attendance: attendance,
        };
        await addDoc(collection(db, 'absent'), data);
        alert('등록되었습니다.');
        setModalOpen(false);
      } else {
        alert('모두 입력해주세요.');
      }
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };

  return (
    <div className="modal-background" onClick={() => setModalOpen(false)}>
      <div
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}>
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
            onChange={(e) => {
              setAttendance(e.value);
              setSelectOption(e);
            }}
            value={selectOption}
            theme={(theme) => ({
              ...theme,
              borderRadius: 10,
              colors: { ...theme.colors, primary25: '#e9deff', primary: '#c3a3ff' },
            })}
          />
          <DatePicker
            showIcon
            locale={ko}
            dateFormat="yyyy년 MM월 dd일"
            minDate={new Date()}
            className="modal__date"
            selected={schedule}
            onChange={(date) => setSchedule(date)}
          />
          <textarea
            name="reason"
            id="modal__reason"
            cols="60"
            rows="10"
            placeholder="사유"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <button className="modal__btn" onClick={handleSubmit}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceModal;
