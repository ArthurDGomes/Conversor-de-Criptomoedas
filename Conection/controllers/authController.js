import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registro
export const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ mensagem: "Usuário já existe" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({ token });

    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        res.status(500).json({ mensagem: "Erro no servidor" });
    }
};

// Login
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ mensagem: "Usuário não encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ mensagem: "Senha incorreta" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });

    } catch (error) {
        console.error("Erro ao fazer login:", error);
        res.status(500).json({ mensagem: "Erro no servidor" });
    }
};
