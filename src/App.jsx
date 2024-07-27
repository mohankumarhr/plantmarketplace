import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Home from './pages/Home'
import Product from './pages/Product'
import Singleproduct from './pages/Singleproduct'
import Cart from './pages/Cart'
import Login from './pages/Login'
import "./CSS/app.css"
import SellerDashbord from './pages/SellerDashbord'
import AddProduct from './pages/AddProduct'
import Register from './pages/Register';
import Profile from './pages/Profile';
import Authentication from './components/Authentication';
import ForgotPassword from './components/ForgotPassword';
import UpdateProduct from './components/UpdateProduct';


function App() {
  return (
    <Router>
     <div className='app-container'>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/product" element={<Product />} />
    <Route path="/productItem" element={<Singleproduct />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/seller/dashbord" element={<SellerDashbord />} />
    <Route path="/seller/addproduct" element={<AddProduct />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/authentication" element={<Authentication />} />
    <Route path="/forgotpassword/:useremail" element={<ForgotPassword />} />
    <Route path="/updateProduct" element={<UpdateProduct />} />
    </Routes>
    </div>
    </Router>
  
  )
}

export default App