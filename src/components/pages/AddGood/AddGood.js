import React, { useState, useRef } from 'react';

import './AddGood.scss';

const AddGood = () => {
  const name = useRef();
  const image = useRef();
  const price = useRef();
  const quantity = useRef();
  const description = useRef();

  const handleAddGood = (e) => {
    e.preventDefault();
    const newGood = {
      name: name.current.value,
      image: image.current.value,
      price: price.current.value,
      quantity: quantity.current.value,
      description: description.current.value,
      good_type_id: 1,
      merchant_id: parseInt(localStorage.getItem('roleId'), 10),
      unit_size_id: 1,
    };
    console.log(newGood);
  };

  return (
        <div className="AddGood">
            <h1>Add Good</h1>
            <form className="col-6 m-auto text-left">
                <div className="form-group">
                    <label htmlFor="good-name">Name:</label>
                    <input ref={name} type="text" className="form-control" id="good-name" placeholder="Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="good-image">Image:</label>
                    <input ref={image} type="text" className="form-control" id="good-image" placeholder="Image Url" />
                </div>
                <div className="form-group">
                    <label htmlFor="good-price">Price:</label>
                    <input ref={price} type="number" step="any" min="1" max="100" className="form-control" id="good-price" />
                </div>
                <div className="form-group">
                    <label htmlFor="good-quantity">Quantity:</label>
                    <input ref={quantity} type="number" min="1" max="100" className="form-control" id="good-quantity" />
                </div>
                <div className="form-group">
                    <label htmlFor="good-description">Description:</label>
                    <textarea ref={description} name="good-description" className="form-control" id="good-description" placeholder="Describe Your Good..." />
                </div>
                <button className="btn btn-success" onClick={handleAddGood}>Save</button>
            </form>
        </div>
  );
};

export default AddGood;
