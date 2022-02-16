import React from 'react';
import './App.css';
import { BrowserRouter, NavLink, Outlet, Route,Routes } from 'react-router-dom';
import { Navbar } from './app/Navbar';
import { PostList } from './features/posts/posts-list';
import { AddPostForm } from './features/posts/add-post-form';

const Layout=()=>{
  return(
    <div className='app-container'>
      <header>
        <Navbar/>
      </header>
      <div className='app-container-content'>
        <nav>
          <NavLink className="link-item" to="/list">list</NavLink>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
const Welcome = () => {
  return (
    <h1 style={{textAlign:"center",marginTop:'50px'}}>Welcom to visit</h1>
  );
};
function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={ <Welcome/>}/>
        <Route path='list' element={<PostList/>}/>
        <Route path='list/add' element={<AddPostForm/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
