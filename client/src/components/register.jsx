import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


export const SignUp = () => {

   sessionStorage.clear()
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { firstName, lastName, email, password };

    const response = await fetch('http://localhost:3001/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    // Store the user's data for use by other components
    
    if (response.ok) {
      sessionStorage.setItem('userData', JSON.stringify(responseData));
      navigate('/home');
    } else {
      alert('User already exist please login');
    }
    // console.log(responseData);
  };

  return (
    <div id="auth" className="flex flex-col justify-center items-center text-center h-screen bg-gray-900 text-gray-200">
    <h1 className="text-6xl py-3">Register</h1>
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <input className='p-2 bg-transparent rounded-md focus:outline-none border-2' placeholder='Enter Your FirstName' type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

      <input required className='p-2 bg-transparent rounded-md focus:outline-none border-2' placeholder='Enter Your LastName' type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />

      <input required className='p-2 bg-transparent rounded-md focus:outline-none border-2' placeholder='Enter Your Email' type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <input required className='p-2 bg-transparent rounded-md focus:outline-none border-2' placeholder='Enter Your password' type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <button type="submit" className="bg-gradient-to-r from-green-600 to-yellow-600 m-auto px-6 py-3 my-8 flex items-center rounded-md hover:scale-110 duration-500"  >SIGNUP</button>
    </form>
    <p>Already have an account? <Link to="/" className="text-blue-300">Login</Link></p>
    </div>
  );
}


export const holdUser = (user)=> {
  return user
}