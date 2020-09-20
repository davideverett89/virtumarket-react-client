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
  className,
  children,
  isDelete,
}) => {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };

  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button className={className} onClick={toggle}>{buttonLabel}</Button>
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
                <AddPaymentMethod toggleAll={toggleAll} />
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
