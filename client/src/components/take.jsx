import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Take = () => {
    const [balance, setBalance] = useState('');
    const navigate = useNavigate();

    const userData = JSON.parse(sessionStorage.getItem("userData"));
    // console.log(userData._id)
    const userId = userData._id
   
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = { userId, balance};

        const response = await fetch('http://localhost:3001/loans/take', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        // Store the user's data for use by other components
        if (response.ok) {
            navigate('/home');
        } else {
            alert('You Have An Outstanding Loan Please Finish Paying First Before You Take Another Loan');
        }
        // console.log(responseData);
    };

    return (
        <div className="flex flex-col justify-center items-center text-center h-screen px-10 bg-gray-900 text-white">
            <h1 className="text-6xl">Take A loan</h1>
            <div className="py-5 text-xl">
                <p>Interest rate is 10%</p>
                <p> period is 18 months</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input required type="number" className='p-2 bg-transparent rounded-md focus:outline-none border-2' placeholder='Enter The Amount You Want' id="balance" value={balance} onChange={(e) => setBalance(e.target.value)} />
                <button type="submit" className="bg-gradient-to-r from-green-600 to-yellow-600 m-auto px-6 py-3 my-8 flex items-center rounded-md hover:scale-110 duration-500" >SUBMIT</button>
            </form>
        </div>
    )
}

export default Take;