import React from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom';
import Posts from './component/Posts';
import Todos from './component/Todos';
import Alboms from './component/Albums';

const AppTest = () => {
  const { id } = useParams();
  return (

    <div>
      <nav className='navBar'>
        <div className='navBarLinks'> <Link to='/Posts' >Posts</Link> </div>
        <div className='navBarLinks'> <Link to='/Alboms' >Albums</Link> </div>
        <div className='navBarLinks'> <Link to='/Todos' >Todos</Link> </div>
  
      </nav>

      <Routes>
        <Route path='/Posts' element={<Posts />} />
        <Route path='/Alboms' element={<Alboms />} />
        <Route path='/Todos' element={<Todos />} />

      </Routes>
    </div>
  )
}

export default AppTest