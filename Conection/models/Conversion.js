import mongoose from "mongoose";

const ConversionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    crypto: String,
    amount: Number,
    result_brl: Number,
    result_usd: Number,
    date: { type: Date, default: Date.now }
});

export default mongoose.model("Conversion", ConversionSchema);
