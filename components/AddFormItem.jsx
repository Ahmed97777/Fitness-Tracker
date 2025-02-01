const AddFormItem = ({
  type = "",
  htmlFor,
  label,
  value,
  handleChange,
  users = [],
}) => {
  if (htmlFor === "name") {
    return (
      <div className="form-control">
        <label className="label" htmlFor={htmlFor}>
          <span className="label-text">{label}</span>
        </label>

        <select
          id={htmlFor}
          name={htmlFor}
          value={value}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        >
          <option value="">Choose name 🔽</option>
          {users.map((user) => (
            <option key={user.name} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="form-control">
      <label className="label" htmlFor={htmlFor}>
        <span className="label-text">{label}</span>
      </label>

      <input
        type={type}
        id={htmlFor}
        name={htmlFor}
        value={value}
        onChange={handleChange}
        required
        className="input input-bordered w-full"
      />
    </div>
  );
};

export default AddFormItem;
