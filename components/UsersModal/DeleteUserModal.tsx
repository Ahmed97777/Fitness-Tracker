import { handleDeleteUsers } from "@/handle-data/userHandlers";
import { useState } from "react";

interface User {
  id?: string;
  name: string;
}

interface DeleteUserModalProps {
  recordToDelete: User | null;
  setRecordToDelete: React.Dispatch<React.SetStateAction<User | null>>;
  setUsersData: React.Dispatch<React.SetStateAction<User[]>>;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  recordToDelete,
  setRecordToDelete,
  setUsersData,
}) => {
  const [deletionLoading, setDeletionLoading] = useState<boolean>(false);

  const handleDeleteClick = async () => {
    await handleDeleteUsers({
      recordToDelete,
      setRecordToDelete,
      setUsersData,
      setDeletionLoading,
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

export default DeleteUserModal;
