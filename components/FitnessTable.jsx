const FitnessTable = ({ fitnessData, setEditData, setRecordToDelete }) => {
  return (
    <table className="table table-zebra w-full">
      <thead>
        <tr>
          <th></th>
          <th>Date</th>
          <th>Name</th>
          <th>Push Up</th>
          <th>Plank (Seconds)</th>
          <th>Squat</th>
          <th>Abs</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {fitnessData
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((data, index) => (
            <tr key={data.id}>
              <th>{index + 1}</th>
              <td>{data.date}</td>
              <td>{data.name}</td>
              <td>{data.pushUp}</td>
              <td>{data.plank}</td>
              <td>{data.squat}</td>
              <td>{data.abs}</td>
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
  );
};

export default FitnessTable;
