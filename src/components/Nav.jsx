import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Nav() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"))

    useEffect(() => {
        const stored = localStorage.getItem("user")
        setIsLoggedIn(!!stored)
    }, []);

    const logout = () => {
        localStorage.removeItem("user")
        setIsLoggedIn(false)
        setIsOpen(false)
        navigate("/login")
    };

    return (
        <nav className="bg-gray-900 text-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-indigo-400">
                    Character Hub </Link>

                <button
                    className="md:hidden text-indigo-400 text-3xl"
                    onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <HiX /> : <HiMenuAlt3 />}
                </button>

                <div className="hidden md:flex items-center gap-4">
                    <Link to="/" className="hover:text-indigo-300">Home</Link>
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="hover:text-indigo-300">Login</Link>
                            <Link to="/register" className="hover:text-indigo-300">Sign Up</Link>
                        </>
                    ) : (
                        <button onClick={logout} className="text-red-400 hover:text-red-300">Logout</button>
                    )}
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
                    <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                            <Link to="/register" onClick={() => setIsOpen(false)}>Sign Up</Link>
                        </>
                    ) : (
                        <button onClick={logout} className="text-left text-red-400">Logout</button>
                    )}
                    
                </div>
            )}
        </nav>
    );
}
