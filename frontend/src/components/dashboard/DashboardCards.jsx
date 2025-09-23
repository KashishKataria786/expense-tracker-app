import React, { useMemo } from "react";
import DisplayCard from "../Analytics/DisplayCard";
import { BusFront,Heart, ShoppingCartIcon, Tv2Icon } from "lucide-react";
import { FaMoneyBill, FaQuestion, FaSellcast } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";


const DashboardCards = ({ data = [] }) => {

  const summaryData = useMemo(() => {
    const income = data
      ?.filter((xp) => xp.type === "INCOME")
      .reduce((sum, xp) => sum + xp.amount, 0);

    const food = data
      ?.filter((xp) => xp.category === "FOOD")
      .reduce((sum, xp) => sum + xp.amount, 0);

    const expense = data
      ?.filter((xp) => xp.type === "EXPENSE")
      .reduce((sum, xp) => sum + xp.amount, 0);

    const transport = data
      ?.filter((xp) => xp.category === "TRANSPORT")
      .reduce((sum, xp) => sum + xp.amount, 0);

    const Entertainment = data
      ?.filter((xp) => xp.category === "ENTERTAINMENT")
      .reduce((sum, xp) => sum + xp.amount, 0);

    const health = data
      ?.filter((xp) => xp.category === "HEALTH")
      .reduce((sum, xp) => sum + xp.amount, 0);

        const shopping = data
        ?.filter((xp) => xp.category === "SHOPPING")
        .reduce((sum, xp) => sum + xp.amount, 0);

    const bills = data
      ?.filter((xp) => xp.category === "BILLS")
      .reduce((sum, xp) => sum + xp.amount, 0);

    const others = data
      ?.filter((xp) => xp.category === "OTHER")
      .reduce((sum, xp) => sum + xp.amount, 0);
      


    return [
      { name: "Income", icon:<FaMoneyBill/>, value: income },
      { name: "Expense",icon:<FaSellcast/>, value: expense },
      { name: "Food",icon:<MdFoodBank/>, value: food },
      { name: "Transport",icon:<BusFront/>, value: transport },
      { name: "Entertainment",icon:<Tv2Icon/>, value: Entertainment },
      { name: "Heath", icon:<Heart/>,value: health },
      { name: "Shopping",icon:<ShoppingCartIcon/>, value: shopping },
      { name: "Others",icon:<FaQuestion/>, value: others },

    ];
  }, [data]);

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {summaryData.map((item, index) => (
        <DisplayCard
          key={index}
          label={item.name}
          icon={item.icon}
          amount={item.value}
        />
      ))}
    </div>

      </>
  );
};

export default DashboardCards;
