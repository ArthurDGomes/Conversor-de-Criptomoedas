import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";
import authMiddleware from "./middleware/authMiddleware.js";
import authRoutes from "./routes/auth.js";
import conversionsRoutes from "./routes/conversions.js";
import favoritesRoutes from "./routes/favorites.js";


dotenv.config();


const app = express();
const PORT = 3000;

app.use(express.json());

const connectDB = async () => {
   
    try {

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado ao MongoDB");

    } catch (error){
    
    console.log("Deu erro ao conectado com o MongoDB", error);
    
    }
};
connectDB();
// app.get("/", (req, res) => {{
// //res.json(arrResponse);
// }});


// No app.use()
app.use("/api/auth", authRoutes);
app.use("/api/conversions", conversionsRoutes);
app.use("/api/favorites", favoritesRoutes);

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));

