import Loan from "../models/loan_model.js";
import Instalment from "../models/instalments_model.js";


const interestRate = 10 / 100 / 12; // monthly interest rate
const paymentPeriod = 18;

// Helper function to calculate the EMI using reducing balance method formula
function calculateEMI(loanAmount, interestRate, paymentPeriod) {
    const r = 1 + interestRate;
    const n = paymentPeriod;
    const p = loanAmount;

    return p * interestRate * Math.pow(r, n) / (Math.pow(r, n) - 1);
}



export const takeLoan = async (req, res) => {

    try {

        const { userId, balance } = req.body;
        // const loansdd = await Loan.deleteMany({})
        // const loansddf = await Instalment.deleteMany({})
        const loans = await Loan.find({ userId })


        if (loans.length === 0 || loans[0].balance <= 0) {
            console.log(loans.length)

            const emiCal = calculateEMI(balance, interestRate, paymentPeriod)

            const newInstallment = new Instalment({
                emi: emiCal.toFixed(3)
            })

            await newInstallment.save();
            console.log(newInstallment.id)
            const instalment = await Instalment.findById(newInstallment.id);

            const newLoan = new Loan({
                userId,
                balance,
                installments: instalment
            });
            await newLoan.save();
            const loan = await Loan.find();
            return res.status(201).json(loan);
        }


        res.status(400).json({ msg: "You have an outstanding balance on your previous loan" });

    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}


export const viewLoan = async (req, res) => {
    try {
        const { userId } = req.query;
        const loan = await Loan.find({ userId })
        res.status(200).json(loan[0].installments)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getSingleLoan = async (req, res) => {
    try {
        const { userId } = req.query;
        const loan = await Loan.find({ userId })
        res.status(200).json(loan)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


export const makePayments = async (req, res) => {
    try {

        const { userId } = req.body;
        const loans = await Loan.find({ userId })

        const openingBalance = loans[0].balance
        const emi = loans[0].installments[0].emi


        const interest = openingBalance * interestRate;
        const principal = emi - interest;
        const closingBalance = openingBalance - principal;
        const installmentCount = loans[0].installments.length;
        const payments = loans[0].installments[installmentCount - 1].payments

        const newInstallment = new Instalment({
            emi,
            payments: payments + 1,
            interest: interest.toFixed(3),
            principal: principal.toFixed(3),
            closing: closingBalance.toFixed(3),

        })

        await newInstallment.save();
        if (newInstallment.payments < 19) {
            const newLoans = await Loan.find({ userId })
            newLoans[0].installments.push(newInstallment)
            const instalment = newLoans[0].installments;
            const updateLoan = await Loan.findByIdAndUpdate(loans[0].id, { balance: closingBalance.toFixed(3), installments: instalment }, { new: true })
            return res.status(200).json(newInstallment);
        }
        const deleteLoan = await Loan.deleteOne({ userId })
        res.status(400).json({ msg: "outstanding balance beyond the time frame agreed" });


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}