import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardFooter,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';

import { Link } from 'react-router-dom';

import UtilityModal from '../UtilityModal/UtilityModal';

import './GoodCard.scss';

const GoodCard = ({ good, handleDelete, userIsMerchant }) => {
  const detailLink = `/goods/${good.id}`;
  const editLink = `/goods/edit/${good.id}`;
  return (
    <div className="GoodCard col-3">
      <Card className="card-main">
        <CardImg className="good-image img-fluid col-6 mx-auto my-3" src={good.image} alt={good.name} />
        <CardBody>
          <CardTitle className="font-weight-bold">{good.name}</CardTitle>
          <CardSubtitle>${good.price}/{good.unit_size.name}</CardSubtitle>
          <CardText>{good.description}</CardText>
        </CardBody>
        <CardFooter className="d-flex flex-row justify-content-center align-items-center">
          <Link to={detailLink} className="mx-1 btn btn-primary">View</Link>
          {
            userIsMerchant
              ? (
              <React.Fragment>
                <Link to={editLink} className="mx-1 btn btn-warning">Update</Link>
                <UtilityModal buttonClassName={'mx-1 btn-danger'} isDelete={true} buttonLabel={'Delete'} modalTitle={'Are you sure?'}>
                  <Button className="btn btn-danger" onClick={() => handleDelete(good.id)}>Yes, Delete</Button>
                </UtilityModal>
              </React.Fragment>
              ) : (
                ''
              )
          }
        </CardFooter>
      </Card>
    </div>
  );
};

export default GoodCard;
