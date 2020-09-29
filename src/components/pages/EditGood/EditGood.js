import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';

import DropDown from '../../shared/DropDown/DropDown';
import PhotoUploader from '../../shared/PhotoUploader/PhotoUploader';

import goodData from '../../../helpers/data/goodData';
import unitSizeData from '../../../helpers/data/unitSizeData';

import './EditGood.scss';

const EditGood = ({ history, match }) => {
  // Initializing an empty object in state to hold the respective values of the requested good object.
  const [good, setGood] = useState({
    name: '',
    price: 0,
    quantity: 0,
    description: '',
  });
  // Initializing an empty array in state to hold multiple requested objects from the unitSizes collection.
  const [unitSizes, setUnitSizes] = useState([]);
  // Initializing a state integer variable to eventually hold the value of the requested good's unitSize id, and the changed unitSize id.
  const [selectedUnitSizeId, setSelectedUnitSizeId] = useState(0);
  // Initializing a state string variable to eventually hold the image url of the uploaded photo.
  const [image, setImage] = useState('');
  // Boolean state variable to determine if component is mounted.
  const [isMounted, setIsMounted] = useState(false);

  // Function that saves the goodId passed in to the router url params,
  // calls the function that makes the API call for a single good, and passes in the needed goodId,
  // and sets the response data to the respective state variables.
  const getGood = useCallback(() => {
    const { goodId } = match.params;
    goodData.getGoodById(goodId)
      .then((response) => {
        if (isMounted) {
          const singleGood = response.data;
          setGood(singleGood);
          setImage(singleGood.image);
          setSelectedUnitSizeId(singleGood.unit_size_id);
        }
      })
      .catch((err) => console.error('There was an issue getting this good:', err));
  }, [isMounted, match.params]);

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

  // When the component mounts, calls the functions to set the good and the unitSizes in state.
  useEffect(() => {
    setIsMounted(true);
    getGood();
    getUnitSizes();
    return () => setIsMounted(false);
  }, [getGood, getUnitSizes]);

  // Event handler function that identifies by id the form input that triggered a change event,
  // and set the corresponding key in the state good object to the value of that form input.
  const handleFieldChange = (e) => {
    const stateToChange = { ...good };
    if (e.target.type === 'number') {
      stateToChange[e.target.id] = parseInt(e.target.value, 10);
    } else {
      stateToChange[e.target.id] = e.target.value;
    }
    setGood(stateToChange);
  };

  // Event handler function to construct a modified good object from the respective values in state
  // and the selected unitSize id from state when the user clicks the submit button.  Makes the put request to the API,
  // and passes in the modified object values.
  const handleEditGood = (e) => {
    e.preventDefault();
    const { goodId } = match.params;
    const updatedName = good.name;
    const updatedImage = image;
    const updatedPrice = good.price;
    const updatedQuantity = good.quantity;
    const updatedDescription = good.description;
    const updatedUnitSizeId = selectedUnitSizeId;
    goodData.patchGood(goodId, updatedName, updatedImage, updatedPrice, updatedQuantity, updatedDescription, updatedUnitSizeId)
      .then(() => {
        history.push(`/home/${sessionStorage.getItem('userRole')}s/${sessionStorage.getItem('roleId')}`);
      })
      .catch((err) => console.error('There was an issue updating this good:', err));
  };

  return (
        <div className="EditGood">
            <h1>Edit Good</h1>
            <form className="col-6 mx-auto jumbotron mb-5 edit-good-form text-left">
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <PhotoUploader image={image} setImage={setImage} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                      value={good.name || ''}
                      onChange={handleFieldChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                      type="number"
                      step="any"
                      min="1"
                      max="100"
                      className="form-control"
                      id="price"
                      value={good.price || ''}
                      onChange={handleFieldChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="unit-size">Unit Size:</label>
                    <DropDown
                      resources={unitSizes}
                      selectedId={selectedUnitSizeId}
                      setSelectedId={setSelectedUnitSizeId}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      className="form-control"
                      id="quantity"
                      value={good.quantity || ''}
                      onChange={handleFieldChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
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
