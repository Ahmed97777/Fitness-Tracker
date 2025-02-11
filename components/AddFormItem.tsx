import { FC } from "react";

interface UserData {
  name: string;
}

interface AddFormItemProps {
  users?: UserData[];
  type?: "date" | "";
  htmlFor: string;
  label: string;
  value: string | number;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const AddFormItem: FC<AddFormItemProps> = ({
  type = "",
  htmlFor,
  label,
  value,
  handleChange,
  users = [],
}) => {
  const handleDateClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    if (inputElement.type === "date") {
      inputElement.showPicker();
    }
  };

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
          <option value="">Select Name ⬇️</option>
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
        onClick={type === "date" ? handleDateClick : undefined}
      />
    </div>
  );
};

export default AddFormItem;
