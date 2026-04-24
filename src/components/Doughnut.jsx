import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

function CombinedComponent() {
  const [statistics, setStatistics] = useState({
    userCount: 0,
    blogCount: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("");
        const { userCount, blogCount } = response.data;
        
        setStatistics({
          userCount,
          blogCount
        });

        setChartData([
          { name: "Users", value: userCount },
          { name: "Blogs", value: blogCount }
        ]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const cards = [
    { name: "Users", number: statistics.userCount },
    { name: "Blogs", number: statistics.blogCount }
  ];

  const COLORS = ["#e24545", "#d9a74a"];

  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 bg-[#d9a74a] flex flex-col gap-4 rounded-md">
          <p className="text-medium text-lg text-white">{payload[0].name}</p>
          <p className="text-sm text-white">
            Value: <span className="ml-2">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <div className="flex flex-wrap justify-center gap-8 max-w-4xl w-full">
        <div className="bg-white p-6 rounded-lg shadow-lg flex-1 max-w-sm">
          <div className="flex flex-wrap">
            {cards.map((card, index) => (
              <div
                className="w-full px-3 mb-6"
                key={index}
              >
                <div className="bg-[#e24545] shadow-xl rounded-2xl p-6">
                  <p className="text-sm font-semibold text-white uppercase mb-2">
                    {card.name}
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {card.number}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex-1 max-w-sm">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={customTooltip} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default CombinedComponent;
