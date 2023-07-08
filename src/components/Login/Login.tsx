import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

const Login = () => {
    const navigate= useNavigate();
    const [error,setError]= useState("");
    const[username, setusername]=useState("");
    const[password, setpassword]=useState("");
    const[isLoading, setIsLoading]= useState(false);
    const handleLogin =async ()=>{
        setIsLoading(true);
        let res= await fetch("http://localhost:3200/login",{
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
                headers: {
                    "Content-Type": "application/json",
                },
        });
        setIsLoading(false);
        if(res.status==200){
            const data  =  await res.json();
            localStorage.setItem('token' , data.token);
            navigate("/home");

        }else{
            setError("Something is wrong");
            setTimeout(()=>{
                setError("");
            }, 3000)
        }
    }
        return (
    <div className="w-screen h-screen bg-emerald-800">

    <div className="m-auto h-96 w-96  min-h-screen pt-60 border-0">
        <form action="" className="flex flex-col justify-between bg-white p-10 shadow-lg">
            <h2 className="m-auto text-xl text-emerald-500 pb-4">LOGIN</h2>
            <p className="text-red-400">{error}</p>
            <div className="flex flex-row justify-between pb-3">
               
                <input className="p-2 text-sm w-full bg-gray-100 focus:outline-none" type="text" placeholder="Enter your username" onChange={(e)=>setusername(e.target.value)} />
            </div>
            <div className="flex flex-row justify-between pb-3" >
                
                <input className=" p-2 text-sm w-full bg-gray-100 focus:outline-none" type="password" placeholder="Enter your password" onChange={(e)=>setpassword(e.target.value)} />
            </div>
            <button  disabled={isLoading} className="h-12 w-full border-2 rounded-md bg-emerald-500 text-white" onClick={handleLogin}> {isLoading? "Loading..........": "Submit"}</button>

            <Link to="/signup" className="text-xs pt-3 text-gray-400"> Not registered yet? <span className="text-emerald-600">Signup</span></Link>
        </form>
    </div>
    </div>
  
  )
}

export default Login