"use client";

import { useState, useEffect } from "react";
import { handleGetUsers } from "@/handle-data/userHandlers";
import DeleteUserModal from "@/components/UsersModal/DeleteUserModal";
import EditUserModal from "@/components/UsersModal/EditUserModal";

interface User {
  id?: string;
  name: string;
}

const Page = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [recordToDelete, setRecordToDelete] = useState<User | null>(null);
  const [editData, setEditData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      await handleGetUsers({ setUsersData, setLoading });
    };

    fetchUsersData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        {usersData.length < 1 ? (
          <div className="flex justify-center items-center">
            <div className="label bg-slate-300 shadow-lg rounded-lg px-3">
              <div>
                <span>No data available. Please add some users.</span>
              </div>
            </div>
          </div>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((data, index) => (
                <tr key={data.id}>
                  <th>{index + 1}</th>
                  <td>{data.name}</td>
                  <td className="flex space-x-2">
                    <button
                      className="btn btn-warning btn-xs"
                      onClick={() => {
                        setEditData(data);
                        (
                          document.getElementById(
                            "editModal"
                          ) as HTMLDialogElement
                        )?.showModal();
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => {
                        setRecordToDelete(data);
                        (
                          document.getElementById(
                            "deleteModal"
                          ) as HTMLDialogElement
                        )?.showModal();
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <DeleteUserModal
        recordToDelete={recordToDelete}
        setRecordToDelete={setRecordToDelete}
        setUsersData={setUsersData}
      />

      <EditUserModal
        editData={editData}
        setEditData={setEditData}
        setUsersData={setUsersData}
      />
    </>
  );
};

export default Page;
