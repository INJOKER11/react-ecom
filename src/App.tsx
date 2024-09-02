import React from "react";
import {Route, Routes} from "react-router-dom";

import Header from './components/Header/Header';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import FullProduct from "./pages/FullProduct";

import './scss/app.scss';



function App() {

  return (
      <div className="wrapper">
          <Header/>
          <div className="content">
            <Routes>
              <Route path="product/:id" element={<FullProduct />}/>
              <Route path="/" element={<Home />}/>
              <Route path="*" element={<NotFound/> }/>
              <Route path="/cart" element={<Cart/>}/>
            </Routes>

          </div>
      </div>
  );
}

export default App;
