import React, { useState } from 'react';

import './PhotoUploader.scss';

const PhotoUploader = ({ image, setImage }) => {
  const [loading, setLoading] = useState(false);
  const uploadImage = async (e) => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'ecwo6ogv');
    setLoading(true);
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/nashville-software-school/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );
    const file = await res.json();
    const newImage = file.secure_url;
    setImage(newImage);
    setLoading(false);
  };
  return (
    <div className="PhotoUploader d-flex align-items-center justify-content-start form-group bg-white p-2">
        <input
            className={`mx-auto ${image === '' ? '' : ''}`}
            type="file"
            name="file"
            placeholder="Upload an image"
            onChange={uploadImage}
        />
        {
            loading
              ? (
                <h6 className="col-2 my-0 mx-auto">Loading...</h6>
              )
              : (
                <img src={image} alt="" className="col-2 upload-photo mx-auto" />
              )
        }
    </div>
  );
};

export default PhotoUploader;
