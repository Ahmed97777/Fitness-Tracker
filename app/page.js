"use client";

import { useEffect, useState } from "react";

import AddFormItem from "@/components/AddFormItem";
import { handleAdd } from "@/handle-data/fitnessHandlers";
import { handleGetUsersForForm } from "@/handle-data/userHandlers";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    pushUp: "",
    plank: "",
    squat: "",
    abs: 0,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      await handleGetUsersForForm({ setUsers });
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["pushUp", "plank", "squat", "abs"].includes(name)
        ? parseInt(value, 10) || 0
        : value,
    });
  };

  const handleSubmit = async (e) => {
    await handleAdd({ e, formData, setFormData, setLoading });
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-4">
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Add Fitness Progress
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AddFormItem
          type="date"
          htmlFor="date"
          label="Date"
          value={formData.date}
          handleChange={handleChange}
        />

        <AddFormItem
          htmlFor="name"
          label="Name"
          value={formData.name}
          handleChange={handleChange}
          users={users}
        />

        <AddFormItem
          htmlFor="pushUp"
          label="Push Up"
          value={formData.pushUp}
          handleChange={handleChange}
        />

        <AddFormItem
          htmlFor="plank"
          label="Plank"
          value={formData.plank}
          handleChange={handleChange}
        />

        <AddFormItem
          htmlFor="squat"
          label="Squat"
          value={formData.squat}
          handleChange={handleChange}
        />

        <AddFormItem
          htmlFor="abs"
          label="Abs"
          value={formData.abs}
          handleChange={handleChange}
        />

        <button type="submit" disabled={loading} className="btn w-full mt-4">
          {loading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            "Add Progress"
          )}
        </button>
      </form>
    </div>
  );
}
