import React from 'react';
import PropTypes from 'prop-types';

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

const GoodCard = ({
  good,
  handleDelete,
  userIsMerchant,
  isBasket,
}) => {
  const detailLink = `/goods/${good.id}`;
  const editLink = `/goods/edit/${good.id}`;
  return (
    <div className="GoodCard col-2">
      <Card className="card-main">
        <CardImg className="good-image img-fluid col-6 mx-auto my-3" src={good.image} alt={good.name} />
        <CardBody>
          <CardTitle className="font-weight-bold">{good.name}</CardTitle>
          <CardSubtitle>${good.price}/{good.unit_size.name}</CardSubtitle>
          {
            isBasket
              ? (
                <CardText>Quantity In Basket: {good.quantity_in_basket}</CardText>
              )
              : (
                ''
              )
          }
        </CardBody>
        {
          isBasket
            ? (
              ''
            )
            : (
            <CardFooter className="d-flex flex-row justify-content-center align-items-center">
              <Link to={detailLink} className="mx-1 btn btn-primary">View</Link>
              {
                userIsMerchant
                  ? (
                    <React.Fragment>
                      <Link to={editLink} className="mx-1 btn btn-warning">Update</Link>
                      <UtilityModal
                        disabled={good.on_order}
                        buttonClassName={'mx-1 btn-danger'}
                        isDelete={true}
                        buttonLabel={good.on_order ? 'Sold' : 'Delete'}
                        modalTitle={'Are you sure?'}
                      >
                        <Button className="btn btn-danger" onClick={() => handleDelete(good.id)}>Yes, Delete</Button>
                      </UtilityModal>
                    </React.Fragment>
                  ) : (
                    ''
                  )
              }
            </CardFooter>
            )
        }
      </Card>
    </div>
  );
};

GoodCard.propTypes = {
  good: PropTypes.shape({
    id: PropTypes.number.isRequired,
    deleted: PropTypes.string,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    good_type: PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    merchant_id: PropTypes.number.isRequired,
    unit_size_id: PropTypes.number.isRequired,
    on_order: PropTypes.bool.isRequired,
  }),
  handleDelete: PropTypes.func.isRequired,
  userIsMerchant: PropTypes.bool.isRequired,
  isBasket: PropTypes.bool.isRequired,
};

export default GoodCard;
