"use client";

import React, { useState } from "react";
import UserSelector from "./UserSelector";
import FitnessChart from "./FitnessChart";
import { useFitnessData } from "@/hooks/useFitnessData";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { fitnessData, users, selectedUser, setSelectedUser } = useFitnessData({
    setLoading,
  });

  if (loading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      {fitnessData.length < 1 ? (
        <div className="flex justify-center items-center">
          <div className="label bg-slate-300 shadow-lg rounded-lg px-3">
            <div>
              <span>
                No data available. Please add some fitness records first.
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl mx-auto mb-14">
          <h2 className="text-lg font-bold mb-4">Daily Push-Up Progression</h2>
          <div className="mb-4">
            <UserSelector
              users={users}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </div>
          <FitnessChart fitnessData={fitnessData} selectedUser={selectedUser} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
