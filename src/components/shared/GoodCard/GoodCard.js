import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter,
  Button,
} from 'reactstrap';

import { Link } from 'react-router-dom';

import './GoodCard.scss';

const GoodCard = ({ good, handleDelete }) => {
  const detailLink = `/goods/${good.id}`;
  const editLink = `/goods/edit/${good.id}`;
  return (
    <div className="col-3">
      <Card className="GoodCard">
        <CardImg className="m-auto img-fluid col-6 mt-3" height="auto" width="100%" src={good.image} alt="Card image cap" />
        <CardBody className="text-left col-6">
            <CardTitle>{good.name}</CardTitle>
            <CardSubtitle>${good.price}</CardSubtitle>
            <CardText>{good.description}</CardText>
            <CardText>Quantity in Stock: {good.quantity}</CardText>
        </CardBody>
        <CardFooter>
          <Link to={detailLink} className="mx-1 btn btn-primary">View</Link>
          <Link to={editLink} className="mx-1 btn btn-warning">Update</Link>
          <Button className="mx-1 btn btn-danger" onClick={() => handleDelete(good.id)}>Delete</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GoodCard;
