import mongoose from "mongoose";

const installmentsSchema = mongoose.Schema({
    emi: {
        type : Number,
        required : true
    },
    payments: {
        type : Number,
        default : 0
        },
    interest: Number,
    principal: Number,
    closing : Number,
});

const Instalment = mongoose.model('Instalment', installmentsSchema);

export default Instalment;