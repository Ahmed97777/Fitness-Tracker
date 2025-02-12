"use client";

import { useState, useEffect } from "react";
import { handleAdd } from "@/handle-data/fitnessHandlers";
import { handleGetUsersForForm } from "@/handle-data/userHandlers";
import AddFormItem from "@/components/AddFormItem";

interface FitnessFormData {
  id?: string;
  date: string;
  name: string;
  pushUp: number;
  plank: number;
  squat: number;
  abs: number;
}

interface User {
  id?: string;
  name: string;
}

export default function Home() {
  const newDate = new Date().toISOString().substring(0, 10);

  const [formData, setFormData] = useState<FitnessFormData>({
    date: newDate,
    name: "",
    pushUp: 0,
    plank: 0,
    squat: 0,
    abs: 0,
  });

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      await handleGetUsersForForm({ setUsers });
    };
    fetchUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: ["pushUp", "plank", "squat", "abs"].includes(name)
        ? parseInt(value, 10) || 0
        : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleAdd({ e, formData, setFormData, setLoading });
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Add Fitness Data
      </h2>
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
          label="Plank (Seconds)"
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

        <button type="submit" disabled={loading} className={`btn w-full mt-4`}>
          {loading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            "Add Fitness Data"
          )}
        </button>
      </form>
    </div>
  );
}
