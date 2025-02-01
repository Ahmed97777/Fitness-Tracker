import { toast } from "react-toastify";

// Edit => PUT request
export const handleEdit = async ({
  editData,
  setEditLoading,
  setFitnessData,
}) => {
  if (!editData) return;

  const updatedData = {
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

    const data = await res.json();
    setFitnessData((prevData) =>
      prevData.map((item) => (item.id === updatedData.id ? updatedData : item))
    );
    toast.success("Fitness data updated successfully");
    document.getElementById("editModal").close();
  } catch (error) {
    toast.error("Error updating fitness data");
  } finally {
    setEditLoading(false);
  }
};

// Get data request
export const handleGet = async ({ setFitnessData, setLoading }) => {
  try {
    const res = await fetch("/api/fitnessData", { method: "GET" });
    if (!res.ok) {
      throw new Error("Failed to fetch fitness data");
    }
    const data = await res.json();
    setFitnessData(data);
    toast.success("Fitness Data Loaded Successfully");
  } catch (error) {
    toast.error("Error loading fitness data");
  } finally {
    setLoading(false);
  }
};

// POST data request
export const handleAdd = async ({ e, formData, setFormData, setLoading }) => {
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

    const newData = await res.json();
    toast.success("Fitness Data Added Successfully");
    // Reset form after successful submission
    setFormData({
      date: "",
      name: "",
      pushUp: "",
      plank: "",
      squat: "",
      abs: 0,
    });
  } catch (error) {
    toast.error("Error adding fitness data");
  } finally {
    setLoading(false);
  }
};

// DELETE data request
export const handleDelete = async ({
  recordToDelete,
  setRecordToDelete,
  setDeletionLoading,
  setFitnessData,
}) => {
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
    document.getElementById("deleteModal").close();
  }
};
