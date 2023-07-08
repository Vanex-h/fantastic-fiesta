
import { useEffect, useState } from "react";
import { Link , useNavigate, useParams } from "react-router-dom";

const UpdateForm = () => {
    const [error,setError] =  useState('')
    const [username,setusername] = useState('')
    const [email,setemail] = useState('')
    const [isLoading , setIsLoading] = useState(false)
    const [user,setUser]  = useState<null |any>(null)
    const navigate  = useNavigate()
    const { id }  = useParams();

    useEffect(() => { 

        // we have the user's ID
        (async function() {
            const res = await fetch(`http://localhost:3200/users/${id}`)
            const data  = await res.json();
            setUser(data)
            setemail(data.email)
            setusername(data.username)
        }())
        
    }, [])

    // placing the data in the forms

    // update the data


    const handleUpdate = async  () => {
        setIsLoading(true);
        let res = await fetch(`http://localhost:3200/update/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            username,
            email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setIsLoading(false);
        if (res.status == 200) {
          navigate("/home");
        } else {
          setError("Something went wrong");
          setTimeout(() => {
            setError("");
          }, 3000);
        }
    }

    return (
        <div className="w-screen h-screen bg-emerald-800 items-center">
          <div className="m-auto h-96 w-96 border-0 min-h-screen pt-60">
            <div className="flex flex-col justify-between bg-white p-10 shadow-lg">
              <h2 className="m-auto text-xl text-emerald-500 pb-4">Signup</h2>
              <p className="text-red-400">{error}</p>
              <div className="flex flex-row justify-between pb-3">
                <input
                  className="p-2 text-sm w-full bg-gray-100 focus:outline-none"
                  type="text"
                  defaultValue={user?.username}
                  placeholder="Enter your username"
                  onChange={(e) => setusername(e.target.value)}
                />
              </div>
              <div className="flex flex-row justify-between pb-3">
                <input
                  className="p-2 text-sm w-full bg-gray-100 focus:outline-none"
                  type="email"
                  defaultValue={user?.email}
                  placeholder="Enter your email"
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div className="flex flex-row justify-between pb-3">
 
              <button
                disabled={isLoading}
                className="h-12 w-full border-2 rounded-md bg-emerald-500 text-white"
                onClick={handleUpdate}
              >
                {isLoading ? "Loading..." : "Update user"}
              </button>
            </div>
          </div>
        </div>
        </div>
    )

}


export default UpdateForm
      