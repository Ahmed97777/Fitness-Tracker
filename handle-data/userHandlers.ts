import { toast } from "react-toastify";

interface User {
  id?: string;
  name: string;
}

// Get ==> GET request for add fit data form
interface GetUsersForFormProps {
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const handleGetUsersForForm = async ({
  setUsers,
}: GetUsersForFormProps): Promise<void> => {
  try {
    const res = await fetch("/api/usersData", {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users data");
    }

    const data: User[] = await res.json();
    setUsers(data);
    console.log("Users Data Loaded Successfully");
  } catch (error) {
    console.error("Error loading users data");
  }
};

// Get ==> GET request for users page
interface GetUsersProps {
  setUsersData: React.Dispatch<React.SetStateAction<User[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleGetUsers = async ({
  setUsersData,
  setLoading,
}: GetUsersProps): Promise<void> => {
  try {
    const res = await fetch("/api/usersData", {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users data");
    }

    const data: User[] = await res.json();
    setUsersData(data);
    toast.success("Users Data Loaded Successfully");
  } catch (error) {
    toast.error("Error loading users data");
  } finally {
    setLoading(false);
  }
};

// Post ==> POST request
interface AddUserProps {
  e: React.FormEvent;
  userData: Omit<User, "id">;
  setUserData: React.Dispatch<React.SetStateAction<Omit<User, "id">>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleAddUser = async ({
  e,
  userData,
  setUserData,
  setLoading,
}: AddUserProps): Promise<void> => {
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

    const newData: User = await res.json();
    toast.success("User Data Added Successfully");
    setUserData({ name: "" });
  } catch (error) {
    toast.error("Error adding user data");
  } finally {
    setLoading(false);
  }
};

// Edit ==> PUT request
interface EditUsersProps {
  editData: User | null;
  setUsersData: React.Dispatch<React.SetStateAction<User[]>>;
  setEditLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleEditUsers = async ({
  editData,
  setUsersData,
  setEditLoading,
}: EditUsersProps): Promise<void> => {
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

    const data: User = await res.json();
    setUsersData((prevData) =>
      prevData.map((item) => (item.id === data.id ? data : item))
    );
    toast.success("Users Data Updated Successfully");
    (document.getElementById("editModal") as HTMLDialogElement)?.close();
  } catch (error) {
    toast.error("Error updating users data");
  } finally {
    setEditLoading(false);
  }
};

// Delete ==> DELETE request
interface DeleteUsersProps {
  recordToDelete: User | null;
  setRecordToDelete: React.Dispatch<React.SetStateAction<User | null>>;
  setUsersData: React.Dispatch<React.SetStateAction<User[]>>;
  setDeletionLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleDeleteUsers = async ({
  recordToDelete,
  setRecordToDelete,
  setUsersData,
  setDeletionLoading,
}: DeleteUsersProps): Promise<void> => {
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
    (document.getElementById("deleteModal") as HTMLDialogElement)?.close();
  }
};
