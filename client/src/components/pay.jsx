import { useLoaderData } from "react-router-dom";
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Pay = () => {
    const data = useLoaderData();
    return(
    data.length === 0 ? <ErrPage /> : <DisplayLoan />
    )
}


const ErrPage = () => {
    return(
        <div className="flex flex-col justify-center items-center text-center h-screen bg-gray-900 text-gray-200">
        <h1 className="text-5xl">You Have Not Taken A Loan yet Please Go To the Loan Page</h1>
    </div>
    )
}


const DisplayLoan = ()=>{
    const data = useLoaderData();
    const installmentsObj = data[0].installments;
    const emi = installmentsObj[0];
    const navigate = useNavigate();
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userId = userData._id


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = { userId };

        const response = await fetch('http://localhost:3001/loans/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        // Store the user's data for use by other components
        if (response.ok) {
            navigate('/success');
        } else {
            alert("You can't pay beyond the agreed time frame, your outstanding balance has been cleared");
        }
        // console.log(responseData);
    };


    return (
        <div className="flex flex-col justify-center items-center text-center h-screen bg-gray-900 text-gray-200">
            <h1 className="text-5xl">Welcome to Payments Department</h1>
            <div className="py-5 text-xl">
                <p>Opening balance  : ZAR {data[0].balance}</p>
                <p>Equated Monthly Instalment(Emi) : ZAR {emi.emi}</p>
                <button onClick={handleSubmit} className="bg-gradient-to-r from-green-600 to-yellow-600 m-auto px-6 py-3 my-8 flex items-center rounded-md hover:scale-110 duration-500">PAY</button>
            </div>
        </div>
    )
}

export const singleLoanLoad = async () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userId = userData._id
    const res = await fetch(`http://localhost:3001/loans/single/?userId=${userId}`);
    const singleLoan = await res.json()
    return singleLoan;

}