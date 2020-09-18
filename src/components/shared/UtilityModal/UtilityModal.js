import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import AddPaymentMethodForm from '../AddPaymentMethodForm/AddPaymentMethodForm';

const UtilityModal = ({
  modalTitle,
  buttonLabel,
  className,
  children,
  isDelete,
  handleAddPaymentMethod,
}) => {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({});

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };

  const toggle = () => setModal(!modal);

  const handleClick = (e) => {
    e.preventDefault();
    toggleNested();
    console.log(newPaymentMethod);
  };

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
              <ModalHeader>Add New Payment Method</ModalHeader>
              <ModalBody>
                <AddPaymentMethodForm setNewPaymentMethod={setNewPaymentMethod} />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={handleClick}>Save</Button>
                {/* <Button color="secondary" onClick={toggleAll}>All Done</Button> */}
              </ModalFooter>
            </Modal>
            {/* <Button color="success" onClick={handleAddPaymentMethod}>Add</Button> */}
          </ModalFooter>
            )
        }
      </Modal>
    </div>
  );
};

export default UtilityModal;
