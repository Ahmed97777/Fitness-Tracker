import { handleDelete } from "@/handle-data/fitnessHandlers";
import { useState } from "react";

interface FitnessData {
  id?: string;
  date: string;
  name: string;
  pushUp: number;
  plank: number;
  squat: number;
  abs: number;
}

interface DeleteUserModalProps {
  recordToDelete: FitnessData | null;
  setRecordToDelete: React.Dispatch<React.SetStateAction<FitnessData | null>>;
  setFitnessData: React.Dispatch<React.SetStateAction<FitnessData[]>>;
}

const DeleteFitnessModal: React.FC<DeleteUserModalProps> = ({
  recordToDelete,
  setRecordToDelete,
  setFitnessData,
}) => {
  const [deletionLoading, setDeletionLoading] = useState<boolean>(false);

  const handleDeleteClick = async () => {
    await handleDelete({
      recordToDelete,
      setRecordToDelete,
      setDeletionLoading,
      setFitnessData,
    });
  };

  return (
    <>
      <dialog id="deleteModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">
            Are you sure you want to delete{" "}
            <strong>{recordToDelete?.name}</strong>? This action cannot be
            undone.
          </p>
          <div className="modal-action">
            <button
              type="button"
              disabled={deletionLoading}
              className={`btn btn-error ${
                deletionLoading ? "btn-disabled" : ""
              }`}
              onClick={handleDeleteClick}
            >
              {deletionLoading ? (
                <span className="loading loading-spinner loading-lg"></span>
              ) : (
                "Confirm Deletion"
              )}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setRecordToDelete(null);
                (
                  document.getElementById("deleteModal") as HTMLDialogElement
                )?.close();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteFitnessModal;
