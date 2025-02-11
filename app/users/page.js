"use client";

import { useState, useEffect } from "react";

import DeleteUserModal from "@/components/UsersModal/DeleteUserModal";
import EditUserModal from "@/components/UsersModal/EditUserModal";
import { handleGetUsers } from "@/handle-data/userHandlers";

const page = () => {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [editData, setEditData] = useState(null);

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
              <span>No data available. Please add users first</span>
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
                        document.getElementById("editModal").showModal();
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => {
                        setRecordToDelete(data);
                        document.getElementById("deleteModal").showModal();
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

export default page;
