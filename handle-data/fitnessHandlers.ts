import { toast } from "react-toastify";

interface FitnessData {
  id?: string;
  date: string;
  name: string;
  pushUp: number;
  plank: number;
  squat: number;
  abs: number;
}

interface HandleEditProps {
  editData: FitnessData | null;
  setEditLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFitnessData: React.Dispatch<React.SetStateAction<FitnessData[]>>;
}

export const handleEdit = async ({
  editData,
  setEditLoading,
  setFitnessData,
}: HandleEditProps): Promise<void> => {
  if (!editData) return;

  const updatedData: FitnessData = {
    ...editData,
    pushUp: Number(editData.pushUp),
    plank: Number(editData.plank),
    squat: Number(editData.squat),
    abs: Number(editData.abs),
  };

  setEditLoading(true);

  try {
    const res = await fetch("/api/fitnessData", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      throw new Error("Failed to edit fitness data");
    }

    const data: FitnessData = await res.json();
    setFitnessData((prevData) =>
      prevData.map((item) => (item.id === data.id ? data : item))
    );
    toast.success("Fitness Data Updated Successfully");
    (document.getElementById("editModal") as HTMLDialogElement).close();
  } catch (error) {
    toast.error("Error updating fitness data");
  } finally {
    setEditLoading(false);
  }
};

interface HandleAddProps {
  e: React.FormEvent;
  formData: FitnessData;
  setFormData: React.Dispatch<React.SetStateAction<FitnessData>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleAdd = async ({
  e,
  formData,
  setFormData,
  setLoading,
}: HandleAddProps): Promise<void> => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("/api/fitnessData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Failed to add fitness data");
    }

    const newDate = new Date().toISOString().substring(0, 10);
    setFormData({
      date: newDate,
      name: "",
      pushUp: 0,
      plank: 0,
      squat: 0,
      abs: 0,
    });

    toast.success("Fitness Data Added Successfully");
  } catch (error) {
    toast.error("Error adding fitness data");
  } finally {
    setLoading(false);
  }
};

interface HandleGetProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFitnessData: React.Dispatch<React.SetStateAction<FitnessData[]>>;
}

export const handleGet = async ({
  setLoading,
  setFitnessData,
}: HandleGetProps): Promise<void> => {
  try {
    const res = await fetch("/api/fitnessData", {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch fitness data");
    }
    const data: FitnessData[] = await res.json();
    setFitnessData(data);
    toast.success("Fitness Data Loaded Successfully");
  } catch (error) {
    toast.error("Error loading fitness data");
  } finally {
    setLoading(false);
  }
};

interface HandleDeleteProps {
  recordToDelete: FitnessData | null;
  setRecordToDelete: React.Dispatch<React.SetStateAction<FitnessData | null>>;
  setDeletionLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFitnessData: React.Dispatch<React.SetStateAction<FitnessData[]>>;
}

export const handleDelete = async ({
  recordToDelete,
  setRecordToDelete,
  setDeletionLoading,
  setFitnessData,
}: HandleDeleteProps): Promise<void> => {
  if (!recordToDelete) return;

  setDeletionLoading(true);

  try {
    const res = await fetch("/api/fitnessData", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: recordToDelete.id }),
    });

    if (!res.ok) {
      throw new Error("Failed to delete fitness data");
    }

    setFitnessData((prevData) =>
      prevData.filter((data) => data.id !== recordToDelete.id)
    );
    toast.success("Fitness Data Deleted Successfully");
  } catch (error) {
    toast.error("Error deleting fitness data");
  } finally {
    setDeletionLoading(false);
    setRecordToDelete(null);
    (document.getElementById("deleteModal") as HTMLDialogElement).close();
  }
};
