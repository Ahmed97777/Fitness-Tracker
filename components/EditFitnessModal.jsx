import { useState } from "react";
import { handleEdit } from "@/handle-data/fitnessHandlers";

const numberClassName =
  "input input-bordered w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

const EditFitnessModal = ({ editData, setEditData, setFitnessData }) => {
  const [editLoading, setEditLoading] = useState(false);

  const handleEditClick = async () => {
    await handleEdit({
      editData,
      setEditLoading,
      setFitnessData,
    });
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
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">Push Up</label>
              <input
                type="number"
                value={editData?.pushUp || 0}
                onChange={(e) =>
                  setEditData({ ...editData, pushUp: e.target.value })
                }
                className={numberClassName}
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">Plank (Seconds)</label>
              <input
                type="number"
                value={editData?.plank || 0}
                onChange={(e) =>
                  setEditData({ ...editData, plank: e.target.value })
                }
                className={numberClassName}
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">Squat</label>
              <input
                type="number"
                value={editData?.squat || 0}
                onChange={(e) =>
                  setEditData({ ...editData, squat: e.target.value })
                }
                className={numberClassName}
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">Abs</label>
              <input
                type="number"
                value={editData?.abs || 0}
                onChange={(e) =>
                  setEditData({ ...editData, abs: e.target.value })
                }
                className={numberClassName}
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

export default EditFitnessModal;
