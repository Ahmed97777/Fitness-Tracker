import { handleDelete } from "@/handle-data/fitnessHandlers";
import { useState } from "react";

const DeleteFitnessModal = ({
  recordToDelete,
  setRecordToDelete,
  setFitnessData,
}) => {
  const [deletionLoading, setDeletionLoading] = useState(false);

  const handleDeleteClick = async () => {
    await handleDelete({
      recordToDelete,
      setRecordToDelete,
      setDeletionLoading,
      setFitnessData,
    });
  };

  return (
    <dialog id="deleteModal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm deletion</h3>
        <p className="py-4">
          Are you sure you want to delete{" "}
          <strong>{recordToDelete?.name}</strong>? This action cannot be undone.
        </p>
        <div className="modal-action">
          <button
            type="button"
            className={`btn btn-error ${deletionLoading ? "btn-disabled" : ""}`}
            onClick={handleDeleteClick}
            disabled={deletionLoading}
          >
            {deletionLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Confirm deletion"
            )}
          </button>

          <button
            type="button"
            className="btn"
            onClick={() => {
              setRecordToDelete(null);
              document.getElementById("deleteModal").close();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteFitnessModal;
