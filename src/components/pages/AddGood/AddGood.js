import React, { useRef, useState, useEffect } from 'react';

import DropDown from '../../shared/DropDown/DropDown';
import PhotoUploader from '../../shared/PhotoUploader/PhotoUploader';

import goodData from '../../../helpers/data/goodData';
import goodTypeData from '../../../helpers/data/goodTypeData';
import unitSizeData from '../../../helpers/data/unitSizeData';

import './AddGood.scss';

const AddGood = ({ history }) => {
  const [goodTypes, setGoodTypes] = useState([]);
  const [unitSizes, setUnitSizes] = useState([]);
  const [selectedGoodTypeId, setSelectedGoodTypeId] = useState(0);
  const [selectedUnitSizeId, setSelectedUnitSizeId] = useState(0);
  const [image, setImage] = useState('');
  const name = useRef();
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
      image,
      price: price.current.value,
      quantity: quantity.current.value,
      description: description.current.value,
      good_type_id: selectedGoodTypeId,
      merchant_id: parseInt(sessionStorage.getItem('roleId'), 10),
      unit_size_id: selectedUnitSizeId,
    };
    goodData.postGood(newGood)
      .then(() => {
        history.push(`/home/${sessionStorage.getItem('userRole')}s/${sessionStorage.getItem('roleId')}`);
      })
      .catch((err) => console.error('There was an issue with adding a good:', err));
  };

  return (
        <div className="AddGood">
            <h1 className="mt-3 display-4">Add Good</h1>
            <form className="col-6 mx-auto text-left jumbotron mb-5 good-form">
                <div className="form-group">
                    <label htmlFor="good-image">Image:</label>
                    <PhotoUploader
                      image={image}
                      setImage={setImage}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="good-name">Name:</label>
                    <input
                      ref={name}
                      type="text"
                      className="form-control"
                      id="good-name"
                      placeholder="Name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="good-type">Select Type:</label>
                    <DropDown
                      resources={goodTypes}
                      selectedId={selectedGoodTypeId}
                      setSelectedId={setSelectedGoodTypeId}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="good-price">Price:</label>
                    <input
                      ref={price}
                      type="number"
                      step="any"
                      min="1"
                      max="100"
                      className="form-control"
                      id="good-price"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="good-unit-size">Unit Size:</label>
                    <DropDown
                      resources={unitSizes}
                      selectedId={selectedUnitSizeId}
                      setSelectedId={setSelectedUnitSizeId}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="good-quantity">Quantity:</label>
                    <input
                      ref={quantity}
                      type="number"
                      min="1"
                      max="100"
                      className="form-control"
                      id="good-quantity"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="good-description">Description:</label>
                    <textarea
                      ref={description}
                      name="good-description"
                      className="form-control"
                      id="good-description"
                      placeholder="Describe Your Good..."
                    />
                </div>
                <button className="btn btn-success" onClick={handleAddGood} disabled={selectedGoodTypeId === 0 || selectedUnitSizeId === 0}>Save</button>
            </form>
        </div>
  );
};

export default AddGood;
