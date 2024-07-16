
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Signup from './components/Signup'
import Privatecomponent from './components/Privatecomponent'
import Login from './components/Login'
import Addproduct from './components/Addproduct'
import Products from './components/Products'
import Update from './components/Update'
import Profile from './components/Profile'



function App() {
  
  

  return (
    <>
    <BrowserRouter>
    <Nav></Nav>
    <Routes>
      <Route element={<Privatecomponent/>}>
      <Route path='/' element={<Products/>}/>
      <Route path='/add' element={<Addproduct/>}/>
      <Route path='/update/:id' element={<Update/>}/>
      <Route path='/logout' element={<h1>Logout component </h1>}/>
      <Route path='/profile' element={<Profile/>}/>
      </Route>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>




    </Routes>
    <Footer></Footer>
    

    </BrowserRouter>
    
    </>
  )
}

export default App
