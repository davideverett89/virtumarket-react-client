import React, { useState, useEffect } from 'react';

import goodData from '../../../helpers/data/goodData';

import './GoodDetail.scss';

const GoodDetail = ({ match, history }) => {
  const [good, setGood] = useState({});

  useEffect(() => {
    const { goodId } = match.params;
    goodData.getGoodById(goodId)
      .then((response) => {
        const singleGood = response.data;
        setGood(singleGood);
      })
      .catch((err) => console.error('There was an issue getting this good:', err));
  }, [match.params]);

  const handleDelete = (e) => {
    const { goodId } = match.params;
    e.preventDefault();
    goodData.deleteGood(goodId)
      .then(() => {
        history.push(`/home/${localStorage.getItem('userRole')}s/${localStorage.getItem('roleId')}`);
      })
      .catch((err) => console.error('There was an issue deleting this good:', err));
  };

  return (
    <div className="GoodDetail d-flex flex-column justify-content-center align-items-center mb-5">
        <h1 className="display-4">{good.name}</h1>
        <img className="m-auto img-fluid col-6" src={good.image} alt={good.name} />
        <h2>Product Details:</h2>
        <p className="lead">${good.price}</p>
        <p className="lead">{good.description}</p>
        <button className="btn btn-danger" onClick={handleDelete}>Remove</button>
    </div>
  );
};

export default GoodDetail;
