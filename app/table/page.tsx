"use client";

import { useState, useEffect } from "react";

import { handleGet } from "@/handle-data/fitnessHandlers";
import FitnessTable from "@/components/FitnessTable";
import DeleteFitnessModal from "@/components/FitnessModal/DeleteFitnessModal";
import EditFitnessModal from "@/components/FitnessModal/EditFitnessModal";

interface FitnessData {
  id?: string;
  date: string;
  name: string;
  pushUp: number;
  plank: number;
  squat: number;
  abs: number;
}

const page = () => {
  const [fitnessData, setFitnessData] = useState<FitnessData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [recordToDelete, setRecordToDelete] = useState<FitnessData | null>(
    null
  );
  const [editData, setEditData] = useState<FitnessData | null>(null);

  useEffect(() => {
    const fetchFitnessData = async () => {
      await handleGet({ setFitnessData, setLoading });
    };
    fetchFitnessData();
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
        {fitnessData.length < 1 ? (
          <div className="flex justify-center items-center">
            <div className="label bg-slate-300 shadow-lg rounded-lg px-3">
              <div>
                <span>No data available. Please add some fitness records.</span>
              </div>
            </div>
          </div>
        ) : (
          <FitnessTable
            fitnessData={fitnessData}
            setEditData={setEditData}
            setRecordToDelete={setRecordToDelete}
          />
        )}
      </div>

      <DeleteFitnessModal
        recordToDelete={recordToDelete}
        setRecordToDelete={setRecordToDelete}
        setFitnessData={setFitnessData}
      />

      <EditFitnessModal
        editData={editData}
        setEditData={setEditData}
        setFitnessData={setFitnessData}
      />
    </>
  );
};

export default page;
