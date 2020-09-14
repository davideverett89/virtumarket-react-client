import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';

import { Link } from 'react-router-dom';

import './GoodCard.scss';

const GoodCard = ({ good, handleDelete }) => {
  const detailLink = `/goods/${good.id}`;
  return (
        <Card className="GoodCard col-6 my-3 d-flex flex-row">
            <CardBody className="text-left col-6">
                <CardTitle>{good.name}</CardTitle>
                <CardSubtitle>${good.price}</CardSubtitle>
                <CardText>{good.description}</CardText>
                <CardText>Quantity in Stock: {good.quantity}</CardText>
                <Link to={detailLink} className="mx-1 btn btn-primary">View</Link>
                <Button className="mx-1 btn btn-danger" onClick={() => handleDelete(good.id)}>Remove</Button>
            </CardBody>
            <CardImg className="m-auto img-fluid col-2" top width="100%" src={good.image} alt="Card image cap" />
        </Card>
  );
};

export default GoodCard;
