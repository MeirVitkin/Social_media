import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Posts from './component/Posts';
import Todos from './component/Todos';
import Albums from './component/Albums';
import Photos from './component/Photos';

const AppTest = ({ id }) => {
  return (
    <div>
      <nav className='navBar'>
        <div className='navBarLinks'>
          <Link to='/Posts' style={{ textDecoration: 'none' }}>
            Posts</Link>
        </div>
        <div className='navBarLinks'>
          <Link to='/Albums' style={{ textDecoration: 'none' }}>
            Albums</Link>
        </div>
        <div className='navBarLinks'>
          <Link to='/Todos' style={{ textDecoration: 'none' }}>
            Todos</Link>
        </div>
       
      </nav>

      <Routes>
        <Route path='/Photos/:albumId' element={<Photos />} />
        <Route path='/Albums' element={<Albums />} />
        <Route path='/Posts' element={<Posts />} />
        <Route path='/Todos' element={<Todos id={id} />} />
      </Routes>
    </div>
  );
}

export default AppTest;


// import React from 'react'
// import { Link, Route, Routes, useParams } from 'react-router-dom';
// import Posts from './component/Posts';
// import Todos from './component/Todos';
// import Alboms from './component/Albums';

// const AppTest = () => {
//   const { id } = useParams();
//   return (

//     <div>
//       <nav className='navBar'>
//         <div className='navBarLinks'> <Link to='/Posts' style={{ textDecoration: 'none' }} >Posts</Link> </div>
//         <div className='navBarLinks'> <Link to='/Alboms' style={{ textDecoration: 'none' }}>Albums</Link> </div>
//         <div className='navBarLinks'> <Link to='/Todos' style={{ textDecoration: 'none' }}>Todos</Link> </div>
//         <div className='navBarLinks'> <Link to='/' style={{ textDecoration: 'none' }}>Home</Link> </div>
  
//       </nav>

//       <Routes>
        
//         <Route path='/Posts' element={<Posts />} />
//         <Route path='/Alboms' element={<Alboms />} />
//         <Route path='/Todos' element={<Todos />} />

//       </Routes>
//     </div>
//   )
// }

// export default AppTest