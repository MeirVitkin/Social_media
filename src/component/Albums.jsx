import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Albums = () => {
  const API_URL = 'http://localhost:3500/albums';

  const [albums, setAlbums] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setAlbums(data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className='albumsContainer'>
      <h2>Albums</h2>
      {albums.map((album) => (
        <div key={album.id} className='album'>
          <Link className='linkToPhotos' to={`/photos/${album.id}`}>
            <h3>#{album.id}</h3>
            <div>{album.title}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Albums;