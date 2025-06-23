import axios from "axios";
import Conversion from "../models/Conversion.js";

export const convertCrypto = async (req, res) => {
    const { crypto, amount } = req.body;

    try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=brl,usd`;

        const response = await axios.get(url);
        const prices = response.data[crypto];

        const result_brl = (prices.brl * amount).toFixed(2);
        const result_usd = (prices.usd * amount).toFixed(2);

        const newConversion = new Conversion({
            user: req.user,
            crypto,
            amount,
            result_brl,
            result_usd
        });

        await newConversion.save();

        res.json({
            result_brl,
            result_usd
        });

    } catch (error) {
        console.error("Erro na conversão:", error);
        res.status(500).json({ mensagem: "Erro ao converter" });
    }
};

export const getConversionHistory = async (req, res) => {
    try {
        const history = await Conversion.find({ user: req.user }).sort({ date: -1 });
        res.json(history);
    } catch (error) {
        console.error("Erro ao buscar histórico:", error);
        res.status(500).json({ mensagem: "Erro ao buscar histórico" });
    }
};
