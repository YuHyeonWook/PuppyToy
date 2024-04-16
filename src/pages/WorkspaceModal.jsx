import React from 'react';
import '../styles/WorkspaceModal.scss';

const WorkspaceModal = ({ setModalOpen }) => {
  return (
    <div>
      <div>
        <span onClick={() => setModalOpen(false)}>X</span>
        <p>모달~~~~~</p>
        <input type="text" />
        <input type="text" />
        <input type="text" />
      </div>
    </div>
  );
};

export default WorkspaceModal;
