import express from 'express'
import { addTransaction, deleteTransaction, editTransaction, getAllTransactions, getSingleTransaction } from '../controllers/transaction.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
const transactionRouter = express.Router();


transactionRouter.get("/",authenticate,getAllTransactions);

transactionRouter.post("/add",authenticate,addTransaction);

transactionRouter.delete("/delete/:id",authenticate,deleteTransaction);

transactionRouter.patch("/edit/:id",authenticate,editTransaction);

transactionRouter.get("/:id",authenticate,getSingleTransaction);

export default transactionRouter