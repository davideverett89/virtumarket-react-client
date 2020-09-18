import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardHeader,
  CardFooter,
  Row,
  Col,
  Button,
} from 'reactstrap';

import { Link } from 'react-router-dom';

import UtilityModal from '../UtilityModal/UtilityModal';

import './GoodCard.scss';

const GoodCard = ({ good, handleDelete, userIsMerchant }) => {
  const detailLink = `/goods/${good.id}`;
  const editLink = `/goods/edit/${good.id}`;
  return (
    <Card className="GoodCard col-9 my-2 p-0">
      <CardHeader>
        <CardTitle className="mb-0">
          <h3 className="mb-0">{good.name}</h3>
        </CardTitle>
      </CardHeader>
      <CardBody className="text-left px-5">
        <Row className="pl-5">
          <Col className="pl-5 pt-5" sm="4">
            <CardSubtitle className="lead good-info">${good.price}</CardSubtitle>
            <CardText className="lead good-info">{good.description}</CardText>
            <CardText className="lead good-info">Quantity in Stock: {good.quantity}</CardText>
          </Col>
          <Col className="text-center" sm="8">
            <CardImg className="col-6 m-auto img-fluid mt-3" height="auto" width="100%" src={good.image} alt="Card image cap" />
          </Col>
        </Row>
      </CardBody>
      <CardFooter className="col-12 d-flex flex-row">
        <Link to={detailLink} className="mx-1 btn btn-primary">View</Link>
        {
          userIsMerchant
            ? (
            <React.Fragment>
              <Link to={editLink} className="mx-1 btn btn-warning">Update</Link>
              <UtilityModal className={'mx-1'} isDelete={true} buttonLabel={'Delete'} modalTitle={'Are you sure?'}>
                <Button className="btn btn-danger" onClick={() => handleDelete(good.id)}>Yes, Delete</Button>
              </UtilityModal>
            </React.Fragment>
            ) : (
              ''
            )
        }
      </CardFooter>
    </Card>
  );
};

export default GoodCard;
