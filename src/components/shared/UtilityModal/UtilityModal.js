import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import AddPaymentMethod from '../AddPaymentMethod/AddPaymentMethod';

const UtilityModal = ({
  modalTitle,
  buttonLabel,
  buttonClassName,
  children,
  isDelete,
  getCurrentUser,
  disabled,
}) => {
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };

  return (
    <div>
      <Button disabled={disabled} className={buttonClassName} onClick={toggle}>{buttonLabel}</Button>
      <Modal centered={true} isOpen={modal} toggle={toggle} className="UtilityModal">
        <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
        <ModalBody className="text-center">
          {children}
        </ModalBody>
        {
          isDelete
            ? (
              ''
            )
            : (
          <ModalFooter className="text-center">
            <Button color="success" onClick={toggleNested}>Add</Button>
            <Modal centered={true} isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
              <ModalHeader toggle={toggleNested}>Add New Payment Method</ModalHeader>
              <ModalBody>
                <AddPaymentMethod toggleNested={toggleNested} getCurrentUser={getCurrentUser} />
              </ModalBody>
            </Modal>
          </ModalFooter>
            )
        }
      </Modal>
    </div>
  );
};

export default UtilityModal;
