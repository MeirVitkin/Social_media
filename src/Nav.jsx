import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Posts from './component/Posts';
import Todos from './component/Todos';
import Albums from './component/Albums';
import Photos from './component/Photos';

const Nav = ({ id }) => {
  
  return (
    <div>
      <nav className='navBar'>
          <Link to='/Posts' className='navBarLinks' style={{ textDecoration: 'none' }}>
            Posts</Link>
          <Link to='/Albums' className='navBarLinks' style={{ textDecoration: 'none' }}>
            Albums</Link>
          <Link to='/Todos' className='navBarLinks' style={{ textDecoration: 'none' }}>
            Todos</Link>
       
      </nav>

      <Routes>
        <Route path='/Photos/:albumId' element={<Photos />} />
        <Route path='/Albums' element={<Albums id={id} />} />
        <Route path='/Posts' element={<Posts />} />
        <Route path='/Todos' element={<Todos id={id} />} />
      </Routes>
    </div>
  );
}

export default Nav;


