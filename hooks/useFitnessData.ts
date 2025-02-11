import { useEffect, useState } from "react";
import { handleGetFitnessProgress } from "@/handle-data/progressHandlers";

interface FitnessData {
  id: number;
  name: string;
  date: string;
  pushUp: number;
  planks: number;
  squats: number;
  abs: number;
}

interface UseFitnessDataParams {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useFitnessData = ({ setLoading }: UseFitnessDataParams) => {
  const [fitnessData, setFitnessData] = useState<FitnessData[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    const fetchFitnessData = async () => {
      await handleGetFitnessProgress({ setFitnessData });
      setLoading(false);
    };
    fetchFitnessData();
  }, [setLoading]);

  useEffect(() => {
    const uniqueUsers = [...new Set(fitnessData.map((item) => item.name))];
    setUsers(uniqueUsers);
  }, [fitnessData]);

  return { fitnessData, users, selectedUser, setSelectedUser };
};
