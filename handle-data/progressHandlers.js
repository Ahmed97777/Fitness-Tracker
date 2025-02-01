import { toast } from "react-toastify";

// Get request for fitness progress
export async function handleGetFitnessProgress({ setFitnessData }) {
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
