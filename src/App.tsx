import React, {lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";

import {Header} from "./components";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";


import './scss/app.scss';

const Cart = lazy(() => import("./pages/Cart"))
const FullProduct = lazy(() => import("./pages/FullProduct"))



function App() {

  return (
      <div className="wrapper">
        <Header/>
        <div className="content">
          <Routes>
            <Route path="product/:id" element={
              <Suspense fallback={<h1>loading</h1>}>
              <FullProduct/>
              </Suspense>
            }/>
            <Route path="/" element={<Home />}/>
            <Route path="*" element={<NotFound/> }/>
            <Route path="/cart" element={
              <Suspense fallback={<h1>loading</h1>}>
                <Cart/>
              </Suspense>}/>
          </Routes>

        </div>
      </div>
  );
}

export default App;
