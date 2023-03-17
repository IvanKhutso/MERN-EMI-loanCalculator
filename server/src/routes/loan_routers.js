import express from "express";
import { makePayments, takeLoan, viewLoan, getSingleLoan } from "../controllers/loan_controller.js";
const loanRouters = express.Router()

loanRouters.post('/take', takeLoan);
loanRouters.get('/view', viewLoan);
loanRouters.post('/pay', makePayments);
loanRouters.get('/single', getSingleLoan)



export default loanRouters;