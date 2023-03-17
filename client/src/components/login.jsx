import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const LogIn = () => {

    sessionStorage.clear()
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        
        event.preventDefault();

        const data = { email, password };

        const response = await fetch('http://localhost:3001/auth/login', {
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
            alert('Invalid credentials');
        }
        // console.log(responseData);
    };

    return (
        <div id="auth" className="flex flex-col justify-center items-center text-center h-screen bg-gray-900 text-gray-200">
            <h1 className="text-4xl">Welcome Back!</h1>
            <p className="py-3">Get your loan at a cheap rate</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input required type="email" className='p-2 bg-transparent rounded-md focus:outline-none border-2' placeholder='Enter Your Email' id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <input required type="password" className='p-2 bg-transparent rounded-md focus:outline-none border-2' placeholder='Enter Your password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" className="bg-gradient-to-r from-green-600 to-yellow-600 m-auto px-6 py-3 my-8 flex items-center rounded-md hover:scale-110 duration-500" >LOGIN</button>
            </form>
            <p>Don't have an account? <Link to="/register" className="text-blue-300">SignUp</Link></p>
        </div>
    );
}

export default LogIn;