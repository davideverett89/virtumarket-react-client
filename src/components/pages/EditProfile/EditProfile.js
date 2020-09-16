import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';

import DropDown from '../../shared/DropDown/DropDown';

import userData from '../../../helpers/data/userData';
import marketData from '../../../helpers/data/marketData';

import './EditProfile.scss';

const EditProfile = ({ match, history }) => {
  const [markets, setMarkets] = useState([]);
  const [user, setUser] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    date_joined: '',
  });
  const [merchant, setMerchant] = useState({
    bio: '',
    profile_image: '',
    booth_image: '',
    company_name: '',
    phone_number: '',
  });
  const [consumer, setConsumer] = useState({});
  const [isMounted, setIsMounted] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

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
          } else {
            setConsumer(currentUser.consumer);
          }
        }
      })
      .catch((err) => console.error('There was an issue with getting this user to update:', err));
  }, [isMounted, match.params]);

  const getAllMarkets = useCallback(() => {
    marketData.getMarkets()
      .then((allMarkets) => {
        if (isMounted) {
          setMarkets(allMarkets);
        }
      })
      .catch((err) => console.error('There was an issue getting all markets:', err));
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
    getUser();
    getAllMarkets();
    return () => setIsMounted(false);
  }, [getAllMarkets, getUser]);

  const handleEditProfile = (e) => {
    e.preventDefault();
    const { userId } = match.params;
    const updatedUser = {
      username: user.username,
      bio: user.merchant !== null ? merchant.bio : consumer.bio,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      profileImage: user.merchant !== null ? merchant.profile_image : consumer.profile_image,
      phoneNumber: user.merchant !== null ? merchant.phone_number : consumer.phone_number,
    };
    if (user.merchant !== null) {
      updatedUser.marketId = parseInt(selectedId, 10);
      updatedUser.companyName = merchant.company_name;
      updatedUser.boothImage = merchant.booth_image;
    }
    userData.patchUser(userId, updatedUser)
      .then(() => {
        history.push(`/accounts/${userId}`);
      })
      .catch((err) => console.error('There was an issue updating this user:', err));
  };

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
        <form className="col-6 mx-auto mb-3 text-left">
            {
                user.merchant !== null
                  ? (
                <React.Fragment>
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
                    <div className="form-group">
                        <label htmlFor="booth-image">Booth Image:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="booth-image"
                            placeholder="Paste Image URL"
                            data-role-name="merchant"
                            data-field-type="role"
                            value={merchant.booth_image || ''}
                            onChange={handleFieldChange}
                            required
                        />
                    </div>
                </React.Fragment>
                  )
                  : ('')
            }
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    data-role-name="user"
                    data-field-type="user"
                    placeholder="Enter New Username"
                    value={user.username || ''}
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
                <label htmlFor="profile-image">Profile Image:</label>
                <input
                    type="text"
                    className="form-control"
                    id="profile-image"
                    data-role-name={`${user.merchant !== null ? 'merchant' : 'consumer'}`}
                    data-field-type="role"
                    placeholder="Paste Image URL"
                    value={(user.merchant !== null ? merchant.profile_image : consumer.profile_image) || ''}
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
                    data-role-name={`${user.merchant !== null ? 'merchant' : 'consumer'}`}
                    data-field-type="role"
                    placeholder="Enter Phone Number"
                    value={(user.merchant !== null ? merchant.phone_number : consumer.phone_number) || ''}
                    onChange={handleFieldChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="bio">Bio:</label>
                <textarea
                    name="bio"
                    data-role-name={`${user.merchant !== null ? 'merchant' : 'consumer'}`}
                    data-field-type="role"
                    className="form-control"
                    id="bio"
                    placeholder="Tell Us About Yourself..."
                    value={(user.merchant !== null ? merchant.bio : consumer.bio) || ''}
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
