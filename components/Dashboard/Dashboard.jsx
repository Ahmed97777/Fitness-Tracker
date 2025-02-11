"use client";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { handleGetFitnessProgress } from "@/handle-data/progressHandlers";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [fitnessData, setFitnessData] = useState([]);
  const [selectedUser, setSelectedUser] = useState("all");
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchFitnessData = async () => {
      await handleGetFitnessProgress({ setFitnessData });
    };

    fetchFitnessData();
  }, []);

  // Get unique users
  const users = [...new Set(fitnessData.map((data) => data.name))];

  useEffect(() => {
    // Filter data based on selected user
    const filteredData =
      selectedUser === "all"
        ? fitnessData
        : fitnessData.filter((data) => data.name === selectedUser);

    // Get unique dates and sort them
    const uniqueDates = [
      ...new Set(filteredData.map((entry) => entry.date)),
    ].sort((a, b) => new Date(a) - new Date(b));

    // Prepare chart data
    const labels = uniqueDates;

    // Prepare datasets
    const datasets =
      selectedUser === "all"
        ? users.map((user) => {
            const userData = uniqueDates.map((date) => {
              // Get push-up data for this user on the current date
              const entry = filteredData.find(
                (data) => data.name === user && data.date === date
              );
              return entry ? entry.pushUp : 0; // If no data for this date, return 0
            });

            return {
              label: user,
              data: userData,
              borderColor: getRandomColor(),
              fill: false,
            };
          })
        : [
            {
              label: selectedUser,
              data: uniqueDates.map((date) => {
                const entry = filteredData.find(
                  (data) => data.name === selectedUser && data.date === date
                );
                return entry ? entry.pushUp : 0;
              }),
              borderColor: "blue",
              fill: false,
            },
          ];

    setChartData({ labels, datasets });
  }, [selectedUser, fitnessData]);

  // Generate random colors for each user
  const getRandomColor = () =>
    `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Push-Up Progress Chart
      </h2>

      {/* User Selection */}
      <div className="mb-4 text-center">
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="select select-bordered ml-2"
        >
          <option value="all">All Users</option>
          {users.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <div className="bg-white p-4 rounded shadow">
        {chartData ? (
          <Line
            data={chartData}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
