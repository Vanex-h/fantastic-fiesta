import { useEffect, useState } from "react";
import User from "./User";

const Home = () => {
  const [users, setUsers] = useState<null | any[]>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      setLoading(true);
      const token = localStorage.getItem("token") as string;

      const res = await fetch("http://localhost:3200/allUsers", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const data = await res.json();
      setLoading(false);
      setUsers(data);
    })();
  }, []);

  const handleDelete = async (id: string) => {
    //  hit the api endpoint with the ID
    const res = await fetch(`http://localhost:3200/delete/${id}`, {
      method: "DELETE",
    });
    // if successful, delete the deleted in the the users array
    if (res.status == 200) {
      const newUsers = users?.filter((users) => users._id != id);
      setUsers(newUsers as any[]);
    }
  };
  const update= async(id:string)=>{
    //  take the user and put his information in a form {value}
    // allow the user to edit thw input fiels
    // naclickinga submit, ucallinge updateHandler  
    const res= await fetch(`http://localhost:3200/${id}`,{
        method :"PUT",
        body: JSON.stringify({
            
        })
    })
  }
  return (
    <div className="w-screen h-screen">
      {loading && "Loading..."}
      {!loading && users != null && (
        <div>
          {users.map((user, i) => (
            <User key={i} username={user.username} email={user.email} _id={user._id}  deleteHandler={handleDelete}/>
          ))}{" "}
        </div>
      )}
      {(!loading && users == null) ||
        (users?.length == 0 && <div>Users empty</div>)}
    </div>
  );
};

export default Home;
