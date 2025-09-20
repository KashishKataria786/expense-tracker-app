import { prisma } from "../config/db.js";
import { validCategories, validTypes } from "../config/utils.js";

export const addTransaction = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    const { title, amount, type, category } = req.body;

    if (!title || !amount || !type || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!validTypes.includes(type)) {
      return res.status(400).json({ error: "Invalid transaction type" });
    }

    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: "Invalid category" });
    }

    const transaction = await prisma.transaction.create({
      data: {
        title,
        amount: parseFloat(amount),
        type,
        category,
        userId,
      },
    });
    if (!transaction)
      return res
        .status(404)
        .json({ error: "Cannot Add expense- Somethings wrong" });

    return res.status(201).json({
      message: "Transaction added successfully",
      transaction,
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
export const getAllTransactions = async (req, res) => {
  const user_Id = req.user.id;
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: user_Id },
      orderBy: { createdAt: "desc" },
    });

    if (!transactions)
      return res.status(400).json({ error: "Error in Getting Transactions" });

    return res.status(200).json({
      message: "Transactions fetched successfully",
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error("Error getting transaction:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
export const getSingleTransaction = async (req, res) => {
  const transaction_Id = Number(req.params.id);
  try {
    const singleTransaction = await prisma.transaction.findUnique({
      where: { id: transaction_Id },
    });
    if (!singleTransaction)
      return res.status(404).json({ error: "Error in Getting Transaction" });

    return res.status(200).json({
      singleTransaction,
    });
  } catch (error) {
    console.error("Error getting single transaction:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
export const deleteTransaction = async (req, res) => {
    const transaction_Id = Number(req.params.id);
    const user_Id = req.user.id;
  try {
    const transaction = await prisma.transaction.findUnique({
        where:{id:transaction_Id}
    })
    if(!transaction)return  res.status(404).json({ error: "Transaction not found" });
    if (transaction.userId !== user_Id)return res.status(403).json({ error: "Not authorized to delete this transaction" });

    await prisma.transaction.delete({
      where: { id: transaction_Id },
    });

    return res.status(200).json({ message: "Transaction deleted successfully" , transaction });

  } catch (error) {
    console.error("Error deleting transaction:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
export const editTransaction = async (req, res) => {
  const userId = req.user.id;
  const transactionId = Number(req.params.id); 
  const { title, amount, type, category } = req.body; 

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    if (transaction.userId !== userId) {
      return res.status(403).json({ error: "Not authorized to update this transaction" });
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        title: title ?? transaction.title,
        amount: amount !== undefined ? parseFloat(amount) : transaction.amount,
        type: type ?? transaction.type,
        category: category ?? transaction.category,
      },
    });

    return res.status(200).json({
      message: "Transaction updated successfully",
      updatedTransaction,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
