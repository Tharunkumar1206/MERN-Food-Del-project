import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose
        .connect('mongodb+srv://tharun:120602@cluster0.2safy.mongodb.net/food-del', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log("DB connected"))
        .catch((err) => console.error("DB connection error:", err));
};
