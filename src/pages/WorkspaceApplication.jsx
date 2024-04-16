import React, { useState } from 'react';
import Header from '../components/Header';
import '../styles/WorkspaceApplication.scss';
<<<<<<< HEAD
import WorkspaceModal from './WorkspaceModal';
=======
>>>>>>> 93c87da3617342600ebc20b0e8dee1367e53e674

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
