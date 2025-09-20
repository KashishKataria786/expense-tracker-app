import express from 'express'
import { addTransaction, deleteTransaction, editTransaction, getAllTransactions, getSingleTransaction } from '../controllers/transaction.controller.js';
import { authenticate, readOnlyPolicy } from '../middlewares/auth.middleware.js';
const transactionRouter = express.Router();


transactionRouter.get("/",authenticate,getAllTransactions);

transactionRouter.post("/add",authenticate,readOnlyPolicy,addTransaction);

transactionRouter.delete("/delete/:id",authenticate,readOnlyPolicy,deleteTransaction);

transactionRouter.patch("/edit/:id",authenticate,readOnlyPolicy,editTransaction);

transactionRouter.get("/:id",authenticate,getSingleTransaction);

export default transactionRouter