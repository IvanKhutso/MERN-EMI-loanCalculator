import { useLoaderData } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

export const Success = () => {
    const navigate = useNavigate();
    const paid = useLoaderData();
    const lastPaid = paid[paid.length - 1]
    // console.log(lastPaid.emi)
    return (
        <div className="flex flex-col justify-center items-center text-center h-screen bg-gray-900 text-white">
            <h1 className="text-7xl">Successfully Paid</h1>

            <div className="text-2xl py-8">
                <p>Amount paid : ZAR  {lastPaid.emi} </p>
                <p>Outstanding Balance  :  ZAR  {lastPaid.closing}  </p>
                <p> Interest Paid : ZAR  {lastPaid.interest}</p>
                <p> Principal Paid : ZAR   {lastPaid.principal} </p>
            </div>
            <Link onClick={navigate('/home')} className="text-bold text-blue-300">Back home</Link>
        </div>
    )
}

