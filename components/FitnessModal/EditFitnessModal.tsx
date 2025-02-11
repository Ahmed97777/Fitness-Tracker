import { handleEdit } from "@/handle-data/fitnessHandlers";
import { useState } from "react";

const numberClassName =
  "input input-bordered w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

interface FitnessData {
  id?: string;
  date: string;
  name: string;
  pushUp: number;
  plank: number;
  squat: number;
  abs: number;
}

interface EditFitnessModalProps {
  editData: FitnessData | null;
  setEditData: React.Dispatch<React.SetStateAction<FitnessData | null>>;
  setFitnessData: React.Dispatch<React.SetStateAction<FitnessData[]>>;
}

const EditFitnessModal: React.FC<EditFitnessModalProps> = ({
  editData,
  setEditData,
  setFitnessData,
}) => {
  const [editLoading, setEditLoading] = useState<boolean>(false);

  const handleEditClick = async () => {
    await handleEdit({
      editData,
      setEditLoading,
      setFitnessData,
    });
  };

  // Ensure that if editData is null, we fallback to default values
  const handleChange = (field: keyof FitnessData, value: any) => {
    if (editData) {
      setEditData({
        ...editData,
        [field]: value,
      });
    }
  };

  return (
    <>
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
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">Push Up</label>
                <input
                  type="number"
                  value={editData?.pushUp || 0}
                  onChange={(e) =>
                    handleChange("pushUp", Number(e.target.value))
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
                    handleChange("plank", Number(e.target.value))
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
                    handleChange("squat", Number(e.target.value))
                  }
                  className={numberClassName}
                />
              </div>

              <div className="form-control mt-4">
                <label className="label">Abs</label>
                <input
                  type="number"
                  value={editData?.abs || 0}
                  onChange={(e) => handleChange("abs", Number(e.target.value))}
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
    </>
  );
};

export default EditFitnessModal;
