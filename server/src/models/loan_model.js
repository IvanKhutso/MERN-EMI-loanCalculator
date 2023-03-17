import mongoose from "mongoose";

const loanSchema = mongoose.Schema({

    userId: {
        type: String,
        required: true
    },

    balance: {
        type: Number,
        required: true
    },
    installments : {
        type : Array,
        default : []

    }
}, { timestamps: true })


const Loan = mongoose.model('Loan', loanSchema);

export default Loan;