import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import WorkspaceList from '../components/WorkspaceList';
import WorkspaceModal from '../components/WorkspaceModal';
import Select from 'react-select';
import '../styles/WorkspaceApplication.scss';

export const WorkspaceApplication = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [attendance, setAttendance] = useState('');
  const [selectOption, setSelectOption] = useState('');
  const options = [
    { value: '외출', label: '외출' },
    { value: '조퇴', label: '조퇴' },
    { value: '결석', label: '결석' },
  ];
  const [selectedItem, setSelectedItem] = useState('');
  const [readonly, setReadonly] = useState(false);

  const btnClick = () => {
    setModalOpen(true);
    setReadonly(false);
  };

  const handleItemClick = (itemData) => {
    setSelectedItem(itemData);
    setModalOpen(true);
    setReadonly(true);
  };

  return (
    <>
      <Header />
      <div className="topSide">
        <Select
          className="select"
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
        <button className="registBtn" onClick={() => btnClick()}>
          신청
        </button>
      </div>
      <WorkspaceList attendance={attendance} onItemClick={handleItemClick} />
      {modalOpen && (
        <WorkspaceModal
          setModalOpen={setModalOpen}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          readonly={readonly}
        />
      )}
    </>
  );
};
