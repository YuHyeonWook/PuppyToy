import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import Select from 'react-select';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { IoMdClose } from 'react-icons/io';
import 'react-datepicker/dist/react-datepicker.css';
import '@styles/WorkspaceModal.scss';

const WorkspaceModal = ({ setIsModalOpen, selectedItem, setSelectedItem, isReadonly }) => {
  const [schedule, setSchedule] = useState<Date>(new Date());
  const [reason, setReason] = useState<string>('');
  const [attendance, setAttendance] = useState<string>('');
  const [selectOption, setSelectOption] = useState('');
  const [userName, setUserName] = useState('');

  // list 누르면 선택된 모달창에 데이터가  schedule, reason, attendance에 들어가짐
  useEffect(() => {
    if (selectedItem) {
      setSchedule(selectedItem.date.toDate());
      setReason(selectedItem.reason);
      setAttendance(selectedItem.attendance);
      setSelectOption({ value: selectedItem.attendance, label: selectedItem.attendance });
      setUserName(selectedItem.name);
    } else {
      setUserName(userItem.name);
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
        setIsModalOpen(false);
      } else {
        alert('모두 입력해주세요.');
      }
    } catch (error: any) {
      console.log(error.code);
      console.log(error.message);
    }
  };

  return (
    <div
      className="modal-background"
      onClick={() => {
        setSelectedItem('');
        setIsModalOpen(false);
      }}>
      <div
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <h1>신청서</h1>
        <span
          className="modal-close"
          onClick={() => {
            setSelectedItem('');
            setIsModalOpen(false);
          }}>
          <IoMdClose />
        </span>
        <div className="modal__conent">
          <div className="modal__wrapper">
            <input className="modal__name" type="text" value={userName} readOnly />
            <Select
              className="modal__select"
              options={options}
              placeholder="결석형태"
              onChange={(e) => {
                setAttendance(e.value);
                setSelectOption(e);
              }}
              readOnly={isReadonly}
              value={selectOption}
              theme={(theme) => ({
                ...theme,
                borderRadius: 10,
                colors: { ...theme.colors, primary25: '#e9deff', primary: '#c3a3ff' },
              })}
              isDisabled={isReadonly}
            />
            <DatePicker
              showIcon
              locale={ko}
              dateFormat="yyyy년 MM월 dd일"
              minDate={new Date()}
              className="modal__date"
              selected={schedule}
              onChange={(date) => setSchedule(date)}
              readOnly={isReadonly}
            />
          </div>
          <textarea
            name="reason"
            id="modal__reason"
            cols="60"
            rows="10"
            placeholder="사유"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            readOnly={isReadonly}
          />
          <button className="modal__btn" onClick={handleSubmit} disabled={isReadonly}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceModal;
