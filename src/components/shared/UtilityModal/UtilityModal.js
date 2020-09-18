import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

const UtilityModal = ({
  modalTitle,
  buttonLabel,
  className,
  children,
  isDelete,
}) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button className={className} color="danger" onClick={toggle}>{buttonLabel}</Button>
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
            <Button color="primary" onClick={toggle}>Do Something</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
            )
        }
      </Modal>
    </div>
  );
};

export default UtilityModal;
