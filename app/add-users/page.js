"use client";

import { useState } from "react";
import Link from "next/link";

import { handleAddUser } from "@/handle-data/userHandlers";

const page = () => {
  const [userData, setUserData] = useState({ name: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmitClick = async (e) => {
    await handleAddUser({ e, userData, setUserData, setLoading });
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-4">
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Add New User
        </h2>
        <Link
          href="/users"
          className="btn btn-accent font-semibold text-center"
        >
          Users List
        </Link>
      </div>

      <form onSubmit={handleSubmitClick} className="space-y-4">
        <div className="form-control">
          <label className="label" htmlFor="name">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        <button type="submit" disabled={loading} className="btn w-full mt-4">
          {loading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            "Add User"
          )}
        </button>
      </form>
    </div>
  );
};

export default page;
