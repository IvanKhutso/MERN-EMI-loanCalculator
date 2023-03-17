# LOANS
This repository contains a loan management system(Reducing Balance Method to calculate the EMI) with a client and a server. The server is built using Express, Node.js, and MongoDB, and provides various endpoints to allow users to register, login, take a loan, view their payments and outstanding balances, and make payments. User information is protected using bcrypt and JSON Web Tokens.

The client is built using ReactJS and Tailwind for styling. React Router v6.4 is used for routing, and the client sends fetch requests to the server to retrieve data. User information is stored in sessionStorage and is deleted when the user logs out or closes the tab.

# Getting Started
To run the LOANS application, follow these steps:

Clone the repository to your local machine.
Install the required dependencies for the server by running npm install in the server directory.
Start the server by running npm start in the server directory.
Install the required dependencies for the client by running npm install in the client directory.
Start the client by running npm start in the client directory.
Server Endpoints
The server provides the following endpoints:

/auth/signup/
This endpoint allows users to register by providing their name, email address, password, and contact information.

/auth/login/
This endpoint allows users to log in using their email address and password.

/loans/take/
This endpoint allows users to take a loan if they have no outstanding balance.

/loans/view/
This endpoint allows users to view their payments, interest paid, principal paid so far, and outstanding balances.

/loans/pay/
This endpoint allows users to submit an installment and receive a response with the amount paid, outstanding balance, interest paid, and principal paid.

All responses from the server are in JSON format.

# Client
The client is built using ReactJS and Tailwind for styling. React Router v6.4 is used for routing, and the client sends fetch requests to the server to retrieve data.

# Conclusion
The LOANS application is a simple loan management system that allows users to register, login, take a loan, view their payments and outstanding balances, and make payments. The server is built using Express, Node.js, and MongoDB, and user information is protected using bcrypt and JSON Web Tokens. The client is built using ReactJS and Tailwind for styling.
