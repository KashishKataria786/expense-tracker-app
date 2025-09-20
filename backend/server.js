import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from 'colors'
import AuthRouter from "./routes/auth.routes.js";
import morgan from "morgan";
import transactionRouter from "./routes/transaction.route.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan());

app.use("/api/auth", AuthRouter);
app.use("/api/transaction", transactionRouter);

app.get("/", (req, res) => {
  res.send("Express + Prisma + Neon PostgreSQL running!".bgBlue);
});

const PORT = process.env.PORT;

if(process.env.NODE_ENV!=='production'){
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;