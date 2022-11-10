import logo from './logo.svg';
import './App.css';
import { Home } from './Components/Home';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Login } from './Components/Login';
import { Signup } from './Components/Signup';
import { NotFound } from './Components/NotFound';

import { Cart } from './Components/Cart';
import { AddProduct } from './Components/AddProduct';
import ProductView from './Components/ProductView';
import Sale from './Components/Pages/Sale';
import Summer from './Components/Pages/Sale';
import Sale from './Components/Pages/Sale';
import Sale from './Components/Pages/Sale';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path ="/signup" element={<Signup/>}/>
        <Route path ="/cart" element={<Cart/>}/>
        <Route path = '/add-product' element={<AddProduct/>}/>
        <Route path = '/product-view' element={<ProductView/>}/>
        <Route path ='/sale' element={<Sale/>}/>
        <Route path = '/summer' element={<Summer/>}/>
        <Route path = '/winter' element={<Winter/>}/>
        <Route path = '/accessories' element={<Accessories/>}/>
        
    
      </Routes>
      </BrowserRouter>
  
  
    </div>
  );
}

export default App;
