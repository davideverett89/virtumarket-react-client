import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';

import DropDown from '../../shared/DropDown/DropDown';
import PhotoUploader from '../../shared/PhotoUploader/PhotoUploader';

import goodData from '../../../helpers/data/goodData';
import goodTypeData from '../../../helpers/data/goodTypeData';
import unitSizeData from '../../../helpers/data/unitSizeData';

import './AddGood.scss';

const AddGood = ({ history }) => {
  // Boolean state variable to determine if component is mounted.
  const [isMounted, setIsMounted] = useState(false);
  // Initializing an empty array in state to hold mutiple objects from the goodTypes collection.
  const [goodTypes, setGoodTypes] = useState([]);
  // Initializing an empty array in state to hold multiple objects from the unitSizes collection.
  const [unitSizes, setUnitSizes] = useState([]);
  // Initializing a state integer variable to eventually hold the value of the selected goodType id.
  const [selectedGoodTypeId, setSelectedGoodTypeId] = useState(0);
  // Initializing a state integer variable to eventually hold the value of the selected unitSize id.
  const [selectedUnitSizeId, setSelectedUnitSizeId] = useState(0);
  // Initializing a state string variable to eventually hold the image url of the uploaded photo.
  const [image, setImage] = useState('');
  // Variable to contain the value of the name ref in the form.
  const name = useRef();
  // Variable to contain the value of the price ref in the form.
  const price = useRef();
  // Variable to contain the value of the quantity ref in the form.
  const quantity = useRef();
  // Variable to contain the value of the description ref in the form.
  const description = useRef();

  // Calls the function that requests an array of goodTypes from the API and sets them to state.
  const getGoodTypes = useCallback(() => {
    goodTypeData.getGoodTypes()
      .then((allGoodTypes) => {
        if (isMounted) {
          setGoodTypes(allGoodTypes);
        }
      })
      .catch((err) => console.error('There was an issue getting all good types:', err));
  }, [isMounted]);

  // Calls the function that request an array of unitSizes from the API and sets them to state.
  const getUnitSizes = useCallback(() => {
    unitSizeData.getUnitSizes()
      .then((allUnitSizes) => {
        if (isMounted) {
          setUnitSizes(allUnitSizes);
        }
      })
      .catch((err) => console.error('There was an issue getting all good types:', err));
  }, [isMounted]);

  // When the component mounts, calls the functions to set the goodTypes and the unitSizes in state.
  useEffect(() => {
    setIsMounted(true);
    getGoodTypes();
    getUnitSizes();
    return () => setIsMounted(false);
  }, [getGoodTypes, getUnitSizes]);

  // Event handler function to construct a new good object from the form ref values
  // and the selected goodType and unitSize ids from state.  Makes the post request to the API,
  // and passes in the new object.
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
            <form className="pt-1 col-6 mt-5 mx-auto text-left jumbotron mb-5 good-form">
                <h1 className="text-center rounded mx-auto display-4 p-2">Add New Good</h1>
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
                <button
                  className="btn btn-success"
                  onClick={handleAddGood}
                  disabled={selectedGoodTypeId === 0 || selectedUnitSizeId === 0}
                >
                  Save
                </button>
            </form>
        </div>
  );
};

export default AddGood;
