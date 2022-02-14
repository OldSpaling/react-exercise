import React from 'react';
import './App.css';
import { BrowserRouter, NavLink, Outlet, Route,Routes } from 'react-router-dom';
import { Navbar } from './app/Navbar';
import { PostList } from './features/posts/posts-list';
const Welcom=()=>{
  return(
    <div className='app-container'>
      <header>
        <Navbar/>
      </header>
      <div className='app-container-content'>
        <nav>
          <NavLink to="/list">list</NavLink>
        </nav>
        <main>
          <h2>Welcom to the redux Essentials Example App.</h2>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Welcom/>}>
        <Route path='list' element={<PostList/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
