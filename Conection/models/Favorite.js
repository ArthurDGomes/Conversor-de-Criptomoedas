import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    crypto: String
});

export default mongoose.model("Favorite", FavoriteSchema);
