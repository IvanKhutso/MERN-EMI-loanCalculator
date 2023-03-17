import React from "react";
import { SignUp, holdUser } from "./components/register";
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, createRoutesFromElements, Link, Outlet, RouterProvider } from "react-router-dom"
import Home from "./components/home.jsx";
import LogIn from './components/login.jsx';
import { Pay, singleLoanLoad } from './components/pay.jsx';
import { Statements, dataLoader } from "./components/statemants.jsx";
import { Success } from "./components/success";
import Take from './components/take.jsx'
import './index.css';


function App(props) {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} >
        <Route index element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/pay" element={<Pay />} loader={singleLoanLoad} />
        <Route path="/home/statements" element={<Statements />} loader={dataLoader} />
        <Route path="/home/Take" element={<Take />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/success" element={<Success />} loader={dataLoader} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  );
}


const Root = () => {
  return (
    <>
      {/* <div>
        <Link to='home'>Home</Link>
        <Link to='register'>Home</Link>
        <Link to='statements'>Home</Link>
      </div> */}
      <Outlet />
    </>
  )
}

export default App;
