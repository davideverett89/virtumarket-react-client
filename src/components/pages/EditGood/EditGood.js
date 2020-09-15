import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';

import DropDown from '../../shared/DropDown/DropDown';

import goodData from '../../../helpers/data/goodData';
import unitSizeData from '../../../helpers/data/unitSizeData';

import './EditGood.scss';

const EditGood = ({ history, match }) => {
  const [good, setGood] = useState({
    name: '',
    image: '',
    price: 0,
    quantity: 0,
    description: '',
  });
  const [unitSizes, setUnitSizes] = useState([]);
  const [selectedUnitSizeId, setSelectedUnitSizeId] = useState(0);
  const name = useRef();
  const image = useRef();
  const price = useRef();
  const quantity = useRef();
  const description = useRef();

  const getGood = useCallback(() => {
    const { goodId } = match.params;
    goodData.getGoodById(goodId)
      .then((response) => {
        const singleGood = response.data;
        setGood(singleGood);
        setSelectedUnitSizeId(singleGood.unit_size_id);
      })
      .catch((err) => console.error('There was an issue getting this good:', err));
  }, [match.params]);

  const getUnitSizes = () => {
    unitSizeData.getUnitSizes()
      .then((allUnitSizes) => {
        setUnitSizes(allUnitSizes);
      })
      .catch((err) => console.error('There was an issue getting all good types:', err));
  };

  useEffect(() => {
    getGood();
    getUnitSizes();
  }, [getGood]);

  const handleFieldChange = (e) => {
    const stateToChange = { ...good };
    if (e.target.type === 'number') {
      stateToChange[e.target.id] = parseInt(e.target.value, 10);
    } else {
      stateToChange[e.target.id] = e.target.value;
    }
    setGood(stateToChange);
  };

  const handleEditGood = (e) => {
    e.preventDefault();
    const { goodId } = match.params;
    const updatedName = good.name;
    const updateImage = good.image;
    const updatedPrice = good.price;
    const updatedQuantity = good.quantity;
    const updatedDescription = good.description;
    const updatedUnitSizeId = selectedUnitSizeId;
    goodData.patchGood(goodId, updatedName, updateImage, updatedPrice, updatedQuantity, updatedDescription, updatedUnitSizeId)
      .then(() => {
        history.push(`/home/${sessionStorage.getItem('userRole')}s/${sessionStorage.getItem('roleId')}`);
      })
      .catch((err) => console.error('There was an issue updating this good:', err));
  };

  return (
        <div className="EditGood">
            <h1>Edit Good</h1>
            <form className="col-6 m-auto text-left">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input ref={name} type="text" className="form-control" id="name" placeholder="Name" value={good.name || ''} onChange={handleFieldChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input ref={image} type="text" className="form-control" id="image" placeholder="Image Url" value={good.image || ''} onChange={handleFieldChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input ref={price} type="number" step="any" min="1" max="100" className="form-control" id="price" value={good.price || ''} onChange={handleFieldChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="unit-size">Unit Size:</label>
                    <DropDown resources={unitSizes} selectedId={selectedUnitSizeId} setSelectedId={setSelectedUnitSizeId}/>
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input ref={quantity} type="number" min="1" max="100" className="form-control" id="quantity" value={good.quantity || ''} onChange={handleFieldChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        ref={description}
                        name="description"
                        className="form-control"
                        id="description"
                        placeholder="Describe Your Good..."
                        value={good.description || ''}
                        onChange={handleFieldChange}
                    />
                </div>
                <button className="btn btn-success" onClick={handleEditGood}>Edit</button>
            </form>
        </div>
  );
};

export default EditGood;
