import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import Spinner from "../Spinner.jsx";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8A2BE2", "#FF69B4"];

const CategoryWiseExpenseBreakDown = ({ data = [], loading = true }) => {
  const categoryData = useMemo(() => {
    const grouped = {};
    data
      .filter((t) => t.type === "EXPENSE")
      .forEach((t) => {
        if (!grouped[t.category]) grouped[t.category] = 0;
        grouped[t.category] += t.amount;
      });

    return Object.keys(grouped).map((category, index) => ({
      name: category,
      value: grouped[category],
      fill: COLORS[index % COLORS.length], // assign colors to each bar
    }));
  }, [data]);

  if (loading) return <Spinner />;

  return (
    <div className="w-full h-[400px] bg-white shadow-lg  p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Expense Breakdown by Category
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={categoryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value">
            {categoryData.map((entry, index) => (
              <cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryWiseExpenseBreakDown;
