import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Spinner from "../Spinner.jsx";

const COLORS = ["#00C49F", "#FF4C4C"]; 

const IncomeVsExpense = ({ data = [], loading = true }) => {
  const summaryData = useMemo(() => {
    const income = data
      ?.filter((xp) => xp.type === "INCOME")
      .reduce((sum, xp) => sum + xp.amount, 0);

    const expense = data
      ?.filter((xp) => xp.type === "EXPENSE")
      .reduce((sum, xp) => sum + xp.amount, 0);

    return [
      { name: "Income", value: income },
      { name: "Expense", value: expense },
    ];
  }, [data]);

  if (loading) return <Spinner />;

  return (
    <div className="w-full h-[400px] bg-white shadow-lg  p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Income vs Expense
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={summaryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label
          >
            {summaryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeVsExpense;
