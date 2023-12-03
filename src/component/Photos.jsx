import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Photos = () => {
  const { albumId } = useParams();
  const API_URL = `http://localhost:3500/photos?albumId=${albumId}`;

  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [albumId]);

  return (
    <div className='photosContainer'>
      <h2>Photos</h2>
      <div className='photoList'>
        {photos.map((photo) => (
          <div key={photo.id} className='photo'>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;