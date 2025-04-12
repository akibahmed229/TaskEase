import express from "express"; // Default import
import authRouter from "./routes/auth"; // Make sure path is correct

const app = express();

app.use(express.json());
app.use("/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Hola Mundo");
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
