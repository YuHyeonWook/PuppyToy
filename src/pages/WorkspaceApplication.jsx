import React, { useState } from 'react';
import Header from '../components/Header';
import '../styles/WorkspaceApplication.scss';
import WorkspaceModal from './WorkspaceModal';

const WorkspaceApplication = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const btnClick = () => {
    setModalOpen(true);
  };
  return (
    <>
      <Header />
      <button onClick={() => btnClick()}>신청</button>
      {modalOpen && <WorkspaceModal setModalOpen={setModalOpen} />}
    </>
  );
};

export default WorkspaceApplication;
