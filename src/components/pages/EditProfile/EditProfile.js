import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';

import DropDown from '../../shared/DropDown/DropDown';
import PhotoUploader from '../../shared/PhotoUploader/PhotoUploader';

import userData from '../../../helpers/data/userData';
import marketData from '../../../helpers/data/marketData';

import './EditProfile.scss';

const EditProfile = ({ match, history }) => {
  // Initializing an empty array in state to hold mutiple objects from the markets collection.
  const [markets, setMarkets] = useState([]);
  // Initializing an empty object in state to hold the respective values of the requested user object.
  const [user, setUser] = useState({
    id: 0,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    date_joined: '',
  });

  // Initializing an empty object in state to hold the respective values of the merchant object nested within the requested user object.
  const [merchant, setMerchant] = useState({
    id: 0,
    bio: '',
    company_name: '',
    phone_number: '',
  });
  // Initializing an empty object in state to hold the respective values of the consumer object nested within the requested user object.
  const [consumer, setConsumer] = useState({
    id: 0,
    bio: '',
    phone_number: '',
  });
  // Initializing a state string variable to hold the current profileImage url of the incoming merchant or consumer objects
  // and eventually will hold the image url of the uploaded photo.
  const [profileImage, setProfileImage] = useState('');
  // Initializing a state string variable to hold the current boothImage url of the incoming merchant object
  // and eventually will hold the image url of the uploaded photo.
  const [boothImage, setBoothImage] = useState('');
  // Boolean state variable to determine if component is mounted.
  const [isMounted, setIsMounted] = useState(false);
  // Initializing a integer state variable to hold the value of the selected market id.
  const [selectedId, setSelectedId] = useState(0);

  // Function that saves the userId passed in to the router url params,
  // calls the function that makes the API call to get a single user object, and passes in the needed userId.
  const getUser = useCallback(() => {
    const { userId } = match.params;
    userData.getSimpleUserRoleById(userId)
      .then((response) => {
        if (isMounted) {
          const currentUser = response.data;
          setUser(currentUser);
          if (currentUser.merchant !== null) {
            setMerchant(currentUser.merchant);
            setSelectedId(currentUser.merchant.market_id);
            setProfileImage(currentUser.merchant.profile_image);
            setBoothImage(currentUser.merchant.booth_image);
          } else {
            setConsumer(currentUser.consumer);
            setProfileImage(currentUser.consumer.profile_image);
          }
        }
      })
      .catch((err) => console.error('There was an issue with getting this user to update:', err));
  }, [isMounted, match.params]);

  // Calls the function that request an array of markets from the API and sets them to state.
  const getAllMarkets = useCallback(() => {
    marketData.getMarkets()
      .then((allMarkets) => {
        if (isMounted) {
          setMarkets(allMarkets);
        }
      })
      .catch((err) => console.error('There was an issue getting all markets:', err));
  }, [isMounted]);

  // When the component mounts, sets the respective state variable to true, and calls the functions to request the necessary data.
  // Sets the repective value back to false upon unmount to prevent data leak.
  useEffect(() => {
    setIsMounted(true);
    getUser();
    getAllMarkets();
    return () => setIsMounted(false);
  }, [getAllMarkets, getUser]);

  // Event handler function to construct a modified user object from the respective values in state,
  // and a modified merchant object if applicable, or a modified consumer object if applicable.  Makes the put request to the API,
  // and passes in the modified object values.
  const handleEditProfile = (e) => {
    e.preventDefault();
    const { userId } = match.params;
    const updatedUser = {
      username: user.username,
      bio: merchant.id ? merchant.bio : consumer.bio,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      profileImage,
      phoneNumber: merchant.id ? merchant.phone_number : consumer.phone_number,
    };
    if (merchant.id) {
      updatedUser.marketId = parseInt(selectedId, 10);
      updatedUser.companyName = merchant.company_name;
      updatedUser.boothImage = boothImage;
    }
    userData.patchUser(userId, updatedUser)
      .then(() => {
        history.push(`/accounts/${userId}`);
      })
      .catch((err) => console.error('There was an issue updating this user:', err));
  };

  // Event handler function that identifies by id and/or dataset values the form input that triggered a change event,
  // and set the corresponding key in the state good object to the value of that form input.
  const handleFieldChange = (e) => {
    const userToChange = { ...user };
    const merchantToChange = { ...merchant };
    const consumerToChange = { ...consumer };
    const { roleName, fieldType } = e.target.dataset;
    if (fieldType === 'user' && roleName === 'user') {
      userToChange[e.target.id] = e.target.value;
      setUser(userToChange);
    } else if (fieldType === 'role' && roleName === 'merchant') {
      merchantToChange[e.target.id] = e.target.value;
      setMerchant(merchantToChange);
    } else if (fieldType === 'role' && roleName === 'consumer') {
      consumerToChange[e.target.id] = e.target.value;
      setConsumer(consumerToChange);
    }
  };

  return (
    <div className="EditProfile">
        <h1 className="display-4">Edit Profile</h1>
        <form className="col-6 mx-auto mb-5 edit-profile-form jumbotron text-left">
            <div className="form-group">
                <label htmlFor="profile_image">Profile Image:</label>
                <PhotoUploader image={profileImage} setImage={setProfileImage} />
            </div>
            <div className="form-group">
                <label htmlFor="first_name">First Name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    data-role-name="user"
                    data-field-type="user"
                    placeholder="Enter First Name"
                    value={user.first_name}
                    onChange={handleFieldChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="last_name">Last Name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    data-role-name="user"
                    data-field-type="user"
                    placeholder="Enter Last Name"
                    value={user.last_name}
                    onChange={handleFieldChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    className="form-control"
                    id="email"
                    data-role-name="user"
                    data-field-type="user"
                    placeholder="Enter New Email"
                    value={user.email || ''}
                    onChange={handleFieldChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone_number">Phone Number:</label>
                <input
                    type="text"
                    className="form-control"
                    id="phone_number"
                    data-role-name={`${merchant.id ? 'merchant' : 'consumer'}`}
                    data-field-type="role"
                    placeholder="Enter Phone Number"
                    value={(merchant.id ? merchant.phone_number : consumer.phone_number) || ''}
                    onChange={handleFieldChange}
                    required
                />
            </div>
            {
                merchant.id
                  ? (
                <React.Fragment>
                    <div className="form-group">
                        <label htmlFor="booth_image">Booth Image:</label>
                        <PhotoUploader image={boothImage} setImage={setBoothImage} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="company_name">Company Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="company_name"
                            placeholder="Enter Company Name"
                            data-role-name="merchant"
                            data-field-type="role"
                            value={merchant.company_name || ''}
                            onChange={handleFieldChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="mr-2" htmlFor="market_type">Select Market:</label>
                        <DropDown resources={markets} selectedId={selectedId} setSelectedId={setSelectedId} />
                    </div>
                </React.Fragment>
                  )
                  : ('')
            }
            <div className="form-group">
                <label htmlFor="bio">Bio:</label>
                <textarea
                    name="bio"
                    data-role-name={`${merchant.id ? 'merchant' : 'consumer'}`}
                    data-field-type="role"
                    className="form-control"
                    id="bio"
                    placeholder="Tell Us About Yourself..."
                    value={(merchant.id ? merchant.bio : consumer.bio) || ''}
                    onChange={handleFieldChange}
                    required
                />
            </div>
            <button type="button" className="btn btn-success" onClick={handleEditProfile}>Save</button>
        </form>
    </div>
  );
};

export default EditProfile;
