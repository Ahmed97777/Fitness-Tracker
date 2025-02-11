import { toast } from "react-toastify";

interface HandleGetFitnessProgressParams {
  setFitnessData: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        name: string;
        date: string;
        pushUp: number;
        planks: number;
        squats: number;
        abs: number;
      }[]
    >
  >;
}

export async function handleGetFitnessProgress({
  setFitnessData,
}: HandleGetFitnessProgressParams): Promise<void> {
  try {
    const res = await fetch("/api/fitnessData", {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch fitness data");
    }
    const data = await res.json();
    setFitnessData(data);
    toast.success("Fitness Data Loaded Successfully");
  } catch (error) {
    toast.error("Error loading fitness data");
  }
}
