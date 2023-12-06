import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Photos = () => {
  const { albumId } = useParams();
  const API_URL = `http://localhost:3500/photos?albumId=${albumId}`;

  const [photos, setPhotos] = useState([]);
  const [visiblePhotos, setVisiblePhotos] = useState(6);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setPhotos(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [albumId]);

  const loadMorePhotos = () => {
    setVisiblePhotos((prevVisiblePhotos) => prevVisiblePhotos + 6);
  };

  return (
    <div className='photosContainer'>
      <h2>Photos</h2>
      <div className='photoList'>
        {photos.slice(0, visiblePhotos).map((photo) => (
          <div key={photo.id} className='photo'>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <footer>{photo.title}</footer>
          </div>
        ))}
      </div>
      {visiblePhotos < photos.length && (
        <button onClick={loadMorePhotos} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

export default Photos;
