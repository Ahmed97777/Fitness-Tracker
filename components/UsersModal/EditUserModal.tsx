import { handleEditUsers } from "@/handle-data/userHandlers";
import { useState, useEffect } from "react";

interface User {
  id?: string;
  name: string;
}

interface EditUserModalProps {
  editData: User | null;
  setEditData: React.Dispatch<React.SetStateAction<User | null>>;
  setUsersData: React.Dispatch<React.SetStateAction<User[]>>;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  editData,
  setEditData,
  setUsersData,
}) => {
  const [editLoading, setEditLoading] = useState<boolean>(false);

  const handleEditClick = async () => {
    await handleEditUsers({ editData, setUsersData, setEditLoading });
  };

  return (
    <dialog id="editModal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Fitness Data</h3>
        <div className="py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditClick();
            }}
          >
            <div className="form-control">
              <label className="label">Name</label>
              <input
                type="text"
                value={editData?.name || ""}
                onChange={
                  (e) => setEditData({ ...editData, name: e.target.value }) // Ensures editData is updated as a full User object
                }
                className="input input-bordered w-full"
              />
            </div>

            <div className="modal-action mt-6">
              <button
                type="submit"
                disabled={editLoading}
                className={`btn btn-warning ${
                  editLoading ? "btn-disabled" : ""
                }`}
              >
                {editLoading ? (
                  <span className="loading loading-spinner loading-lg"></span>
                ) : (
                  "Update Data"
                )}
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => {
                  (
                    document.getElementById("editModal") as HTMLDialogElement
                  )?.close();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default EditUserModal;
