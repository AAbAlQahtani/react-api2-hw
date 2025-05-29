import React, { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const url = "https://6837ad992c55e01d184a8113.mockapi.io/users"

    const LoginBtn = () => {
        if (!email || !password) {
            alert("Please fill all fields")
            return
        }

        axios.get(url)
            .then((res) => {
                const user = res.data.find((u) => u.email === email && u.password === password)

                if (user) {
                    alert("Login successful")
                    localStorage.setItem("user", JSON.stringify(user))
                    navigate("/")
                    
                } else {
                    alert("Invalid email or password")
                }
            })

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">Login</h2>

                <div className="mb-4">
                    <label className="block mb-1 text-gray-900">Email</label>
                    
                    <input type="email" placeholder="example@example.com" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-3 p-2 border border-gray-300 rounded" />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-gray-900">Password</label>

                    <input type="password" placeholder="Enter your password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-4 p-2 border border-gray-300 rounded" />
                </div>

                <button onClick={LoginBtn}
                    className="w-full bg-indigo-600 text-white py-2 rounded
                     hover:bg-indigo-700">
                    Login</button>


                <p className="mt-4 text-sm text-gray-600 text-center">Don’t have an account?{" "}
                    <Link to="/register" className="text-indigo-600 hover:underline">
                        Sign Up </Link>
                </p>
            </div>
        </div>
    )
}

