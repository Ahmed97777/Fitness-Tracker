"use client";

import { handleAddUser } from "@/handle-data/userHandlers";
import Link from "next/link";
import { useState } from "react";

interface User {
  name: string;
}

const page = () => {
  const [userData, setUserData] = useState<User>({ name: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmitClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleAddUser({ e, userData, setUserData, setLoading });
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4">
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Add New User
        </h2>
        <Link
          className="btn btn-accent font-semibold text-center"
          href="/users"
        >
          Show all users
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
          ></input>
        </div>

        <button type="submit" disabled={loading} className={`btn w-full mt-4`}>
          {loading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            "Add New User Data"
          )}
        </button>
      </form>
    </div>
  );
};

export default page;
