import { toast } from "react-toastify";

// Get request for add fitness data form
export async function handleGetUsersForForm({ setUsers }) {
  try {
    const res = await fetch("/api/usersData", {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch users data");
    }
    const data = await res.json();
    setUsers(data);
    console.log("Users Data Loaded Successfully");
  } catch (error) {
    console.error("Error loading users data");
  }
}

// Get request for users page
export async function handleGetUsers({ setUsersData, setLoading }) {
  try {
    const res = await fetch("/api/usersData", {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch users data");
    }
    const data = await res.json();
    setUsersData(data);
    toast.success("Users Data Loaded Successfully");
  } catch (error) {
    toast.error("Error loading users data");
  } finally {
    setLoading(false);
  }
}

// post request
export const handleAddUser = async ({
  e,
  userData,
  setUserData,
  setLoading,
}) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("/api/usersData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error("Failed to add user data");
    }

    const newData = await res.json();
    toast.success("User data added successfully");

    // Reset state after successful submission
    setUserData({ name: "" });
  } catch (error) {
    toast.error("Error adding user data");
  } finally {
    setLoading(false);
  }
};

// put request
export const handleEditUsers = async ({
  editData,
  setUsersData,
  setEditLoading,
}) => {
  if (!editData) return;
  setEditLoading(true);

  try {
    const res = await fetch("/api/usersData", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    });

    if (!res.ok) {
      throw new Error("Failed to edit users data");
    }

    const updatedData = await res.json();
    setUsersData((prevData) =>
      prevData.map((item) => (item.id === editData.id ? editData : item))
    );
    toast.success("Users data updated successfully");
    document.getElementById("editModal").close();
  } catch (error) {
    toast.error("Edit error:", error);
  } finally {
    setEditLoading(false);
  }
};

// delete request
export const handleDeleteUsers = async ({
  recordToDelete,
  setRecordToDelete,
  setUsersData,
  setDeletionLoading,
}) => {
  if (!recordToDelete) return;

  setDeletionLoading(true);

  try {
    const res = await fetch("/api/usersData", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: recordToDelete.id }),
    });

    if (!res.ok) {
      throw new Error("Failed to delete users data");
    }
    setUsersData((prevData) =>
      prevData.filter((data) => data.id !== recordToDelete.id)
    );
    toast.success("Users Data Deleted Successfully");
  } catch (error) {
    toast.error("Error deleting users data");
  } finally {
    setDeletionLoading(false);
    setRecordToDelete(null);
    document.getElementById("deleteModal").close();
  }
};
