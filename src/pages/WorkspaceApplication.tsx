import { useState } from 'react';
import WorkspaceList from '../components/WorkspaceList';
import WorkspaceModal from '../components/WorkspaceModal';
import Select from 'react-select';
import { Layout } from '../components/layout/Layout';
import '@styles/WorkspaceApplication.scss';

export const WorkspaceApplication = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [selectOption, setSelectOption] = useState('');
  const options = [
    { value: '모든 결석형태', label: '모든 결석형태' },
    { value: '외출', label: '외출' },
    { value: '조퇴', label: '조퇴' },
    { value: '결석', label: '결석' },
  ];
  const [selectedItem, setSelectedItem] = useState('');
  const [isReadonly, setIsReadonly] = useState(false);

  const btnClick = () => {
    setIsModalOpen(true);
    setIsReadonly(false);
  };

  const handleItemClick = (itemData) => {
    setSelectedItem(itemData);
    setIsModalOpen(true);
    setIsReadonly(true);
  };

  console.log(attendance);
  return (
    <>
      <Layout>
        <div className="topSide">
          <Select
            className="select"
            options={options}
            placeholder="결석형태"
            onChange={(e) => {
              if (e.value === '모든 결석형태') {
                setAttendance(['외출', '조퇴', '결석']);
              } else {
                setAttendance([e.value]);
              }
              setSelectOption(e);
            }}
            value={selectOption}
            theme={(theme) => ({
              ...theme,
              borderRadius: 10,
              colors: { ...theme.colors, primary25: '#e9deff', primary: '#c3a3ff' },
            })}
          />
          <button className="registBtn" onClick={btnClick}>
            신청
          </button>
        </div>
        <WorkspaceList attendance={attendance} onItemClick={handleItemClick} />
        {isModalOpen && (
          <WorkspaceModal
            setIsModalOpen={setIsModalOpen}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            isReadonly={isReadonly}
          />
        )}
      </Layout>
    </>
  );
};
