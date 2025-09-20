import express from 'express'
import { addTransaction, deleteTransaction, editTransaction, getAllTransactions, getSingleTransaction } from '../controllers/transaction.controller';
const transactionRouter = express.Router();
transactionRouter.get("/",getAllTransactions);
transactionRouter.post("/add",addTransaction);
transactionRouter.get("/delete/:id",deleteTransaction);
transactionRouter.get("/edit/:id",editTransaction);
transactionRouter.get("/:id",getSingleTransaction);

export default transactionRouter