import React, { useState } from "react";
import "../../lib/styles/Modal.css";

const Modal = () => {
  const [show, setShow] = useState(false);

  const handleModalClose = (e) => {
    const currentClass = e.target.className;
    if(currentClass === 'modal-card') return ;
    setShow(false);
  };

  const handleModalOpen = (e) => {
    setShow(true);
  };

  return (
    <div>
      <div hidden={!show}>
        <div className="modal-background" onClick={handleModalClose}>
          <div className="modal-card"></div>
        </div>
      </div>
      <button className="button" onClick={handleModalOpen}>
        Open Modal
      </button>
    </div>
  );
};

export default Modal;
