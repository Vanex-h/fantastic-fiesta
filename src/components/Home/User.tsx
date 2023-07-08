import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface UserProps {
  username: string;
  email: string;
  _id: string;
  deleteHandler: (_id: string) => void;
}

const User: FC<UserProps> = ({
  username,
  email,
  _id,
  deleteHandler,
}: UserProps) => {
  const navigate = useNavigate();
  return (
    <div className="p-4 bg-white shadow-lg shadow-slate-500 w-fit mx-auto m-2">
      {" "}
      <p className="font-bold text-emerald-500">{username}</p>
      <p className="opacity-60">{email}</p>
      <button onClick={() => navigate(`/update/${_id}`)}>Update</button>{" "}
      &nbsp;&nbsp;&nbsp;
      <button onClick={() => deleteHandler(_id)}> Delete</button>
    </div>
  );
};

export default User;
