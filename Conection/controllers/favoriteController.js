import Favorite from "../models/Favorite.js";

export const addFavorite = async (req, res) => {
    const { crypto } = req.body;

    try {
        const existing = await Favorite.findOne({ user: req.user, crypto });

        if (existing) {
            // Se já está favoritado, remove
            await Favorite.deleteOne({ _id: existing._id });
            return res.json({ mensagem: "Removido dos favoritos" });
        }

        const newFavorite = new Favorite({
            user: req.user,
            crypto
        });

        await newFavorite.save();

        res.json({ mensagem: "Adicionado aos favoritos" });

    } catch (error) {
        console.error("Erro ao favoritar:", error);
        res.status(500).json({ mensagem: "Erro ao favoritar" });
    }
};

export const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({ user: req.user });
        res.json(favorites);
    } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
        res.status(500).json({ mensagem: "Erro ao buscar favoritos" });
    }
};
