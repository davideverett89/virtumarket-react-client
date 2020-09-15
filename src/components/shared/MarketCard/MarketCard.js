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
  Col,
  Row,
} from 'reactstrap';

import './MarketCard.scss';

const MarketCard = () => (
  (
    <div className="MarketCard">
        <Row>
            <Col sm="6">
                <Card body>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button>Go somewhere</Button>
                </Card>
            </Col>
            <Col sm="6">
                <Card body>
                    <CardTitle>Special Title Treatment</CardTitle>
                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                    <Button>Go somewhere</Button>
                </Card>
            </Col>
        </Row>
    </div>
  )
);

export default MarketCard;
