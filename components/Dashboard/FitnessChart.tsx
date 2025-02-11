import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

interface FitnessDataItem {
  date: string; // ISO date string
  name: string;
  pushUp: number;
}

interface FitnessChartProps {
  fitnessData: FitnessDataItem[];
  selectedUser: string;
}

const getRandomColor = (): string => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 1)`;
};

const FitnessChart: React.FC<FitnessChartProps> = ({
  fitnessData,
  selectedUser,
}) => {
  const labels = [
    ...new Set(
      fitnessData
        .map((item) => new Date(item.date).toLocaleDateString())
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    ),
  ];

  const users = [...new Set(fitnessData.map((item) => item.name))];

  const groupedData =
    selectedUser === ""
      ? users.map((user) => ({
          name: user,
          data: fitnessData
            .filter((item) => item.name === user)
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            ),
        }))
      : [
          {
            name: selectedUser,
            data: fitnessData
              .filter((item) => item.name === selectedUser)
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime()
              ),
          },
        ];

  const datasets = groupedData.map((group) => ({
    label: group.name,
    data: labels.map((label) => {
      const record = group.data.find(
        (item) => new Date(item.date).toLocaleDateString() === label
      );
      return record ? record.pushUp : null;
    }),
    borderColor: getRandomColor(),
    backgroundColor: "rgba(75, 192, 192, 0.2)",
    fill: true,
  }));

  return <Line data={{ labels, datasets }} />;
};

export default FitnessChart;
