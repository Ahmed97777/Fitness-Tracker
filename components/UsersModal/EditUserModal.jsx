import { useState } from "react";
import { handleEditUsers } from "@/handle-data/userHandlers";

const EditUserModal = ({ editData, setEditData, setUsersData }) => {
  const [editLoading, setEditLoading] = useState(false);

  const handleEditClick = async () => {
    await handleEditUsers({
      editData,
      setEditLoading,
      setUsersData,
    });
  };

  return (
    <dialog id="editModal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit User Data</h3>
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
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
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
                  "Update data"
                )}
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => {
                  document.getElementById("editModal").close();
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
