import { useLoaderData } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";



export const Statements = () => {
    const installments = useLoaderData();
    // console.log(installments)
    return (
        installments.error ? <ErrPage /> : <DisplayStatement />
    )
}


export const dataLoader = async () => {
    
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    // console.log(userData._id)
    const userId = userData._id
    const res = await fetch(`http://localhost:3001/loans/view/?userId=${userId}`);
    const installments = await res.json()
    return installments;
}

const ErrPage = () => {
    return (
        <div className="flex flex-col justify-center items-center text-center h-screen bg-gray-900 text-gray-200">
            <h1 className="text-5xl">You Have Not Taken A Loan yet Please Go To the Loan Page</h1>
        </div>
    )
}

const DisplayStatement = () => {
    const installments = useLoaderData();
    const navigate = useNavigate();
    // console.log(installments)
    return (
        <div className=" min-h-screen bg-gray-900 text-white">
            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th scope="col" className="px-6 py-3">Payments</th>
                        <th scope="col" className="px-6 py-3">EMI</th>
                        <th scope="col" className="px-6 py-3">Interest</th>
                        <th scope="col" className="px-6 py-3">Principal</th>
                        <th scope="col" className="px-6 py-3">outstanding</th>
                    </tr>
                </thead>
                <tbody>
                    {installments.map((installment) => (
                        <tr key={installment._id} className="border-b dark:bg-gray-800">
                            <td scope="col" className="px-6 py-3">{installment.payments}</td>
                            <td scope="col" className="px-6 py-3">ZAR {installment.emi}</td>
                            <td scope="col" className="px-6 py-3">ZAR {installment.interest}</td>
                            <td scope="col" className="px-6 py-3">ZAR {installment.principal}</td>
                            <td scope="col" className="px-6 py-3">ZAR {installment.closing} </td>
                        </tr>
                    ))}


                </tbody>
            </table>
            <div className="text-center py-4">
            <Link onClick={navigate('/home')} className="text-bold text-blue-300">Back home</Link>
            </div>

        </div>
    )
}