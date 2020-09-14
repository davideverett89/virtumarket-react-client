import React, { useRef, useState, useEffect } from 'react';

import DropDown from '../../shared/DropDown/DropDown';

import goodData from '../../../helpers/data/goodData';
import goodTypeData from '../../../helpers/data/goodTypeData';
import unitSizeData from '../../../helpers/data/unitSizeData';

import './AddGood.scss';

const AddGood = ({ history }) => {
  const [goodTypes, setGoodTypes] = useState([]);
  const [unitSizes, setUnitSizes] = useState([]);
  const [selectedGoodTypeId, setSelectedGoodTypeId] = useState(0);
  const [selectedUnitSizeId, setSelectedUnitSizeId] = useState(0);
  const name = useRef();
  const image = useRef();
  const price = useRef();
  const quantity = useRef();
  const description = useRef();

  const getGoodTypes = () => {
    goodTypeData.getGoodTypes()
      .then((allGoodTypes) => {
        setGoodTypes(allGoodTypes);
      })
      .catch((err) => console.error('There was an issue getting all good types:', err));
  };

  const getUnitSizes = () => {
    unitSizeData.getUnitSizes()
      .then((allUnitSizes) => {
        setUnitSizes(allUnitSizes);
      })
      .catch((err) => console.error('There was an issue getting all good types:', err));
  };

  useEffect(() => {
    getGoodTypes();
    getUnitSizes();
  }, []);

  const handleAddGood = (e) => {
    e.preventDefault();
    const newGood = {
      name: name.current.value,
      image: image.current.value,
      price: price.current.value,
      quantity: quantity.current.value,
      description: description.current.value,
      good_type_id: selectedGoodTypeId,
      merchant_id: parseInt(localStorage.getItem('roleId'), 10),
      unit_size_id: selectedUnitSizeId,
    };
    goodData.postGood(newGood)
      .then(() => {
        history.push(`/home/${localStorage.getItem('userRole')}s/${localStorage.getItem('roleId')}`);
      })
      .catch((err) => console.error('There was an issue with adding a good:', err));
  };

  return (
        <div className="AddGood">
            <h1 className="mt-3">Add Good</h1>
            <form className="col-6 m-auto text-left">
                <div className="form-group">
                    <label htmlFor="good-name">Name:</label>
                    <input ref={name} type="text" className="form-control" id="good-name" placeholder="Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="good-type">Select Type:</label>
                    <DropDown resources={goodTypes} selectedId={selectedGoodTypeId} setSelectedId={setSelectedGoodTypeId}/>
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
                    <label htmlFor="good-unit-size">Unit Size:</label>
                    <DropDown resources={unitSizes} selectedId={selectedUnitSizeId} setSelectedId={setSelectedUnitSizeId}/>
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
