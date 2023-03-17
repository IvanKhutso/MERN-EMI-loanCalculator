import { Link } from "react-router-dom";



const Home = () => {
    return (
        <main className='px-10 bg-gray-900 text-white min-h-screen'>
            <header className=' min-screen'>
                <nav className='py-10 mb-12 flex justify-between align-middle'>
                    <h1 id="logo" className='text-3xl text-center font-thin underline'>
                        Reducing Balance Method
                    </h1>

                    <div className="flex items-center">
                        <ul className='hidden md:flex text-2xl'>
                            <li className=' px-4 capitalize cursor-pointer font-medium hover:text-gray-400 transition-all duration-200'><Link to="statements">Statements</Link></li>
                            <li className=' px-4  capitalize cursor-pointer font-medium hover:text-gray-400 transition-all duration-200'><Link to="pay">Pay</Link></li>
                            <li className=' px-4 text-red-800  capitalize cursor-pointer font-medium hover:text-gray-400 transition-all duration-200'><Link to="/">LOGOUT</Link></li>

                        </ul>

                    </div>
                </nav>
            </header>

            <section id='banner' className='py-10'>
                <div className="md:text-start text-center justify-center md:flex-row">
                    <div className="flex-col text-center">

                        <h1 className='text-5xl md:text-7xl py-2 font-bold text-blue-600'>The Reducing Balance Method Loan Calculator.</h1>
                        <p className='font-medium py-5 leading-6 text-gray-400  dark:text-gray-400 px-40'>
                            In the Reducing balance method, the interest paid is revised every month on an outstanding
                            loan amount. In this method, an Equated Monthly Instalment (EMI), or simply, an instalment, is one
                            payment of the equally-divided monthly payments to amortise a loan.
                        </p>

                        <div className="py-2 text-center mx-auto">
                            <Link to='take' className="bg-gradient-to-r from-blue-400 to-rose-300 m-auto px-6 py-3 my-8  items-center rounded-md hover:scale-110 duration-500 max-w-sm text-gray-800">Take a loan</Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home;