import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Character() {
    const [characters, setCharacters] = useState([])
    const [name, setName] = useState("")
    const [gender, setGender] = useState("male")
    const [image, setImage] = useState("")
    const [search, setSearch] = useState("")
    const [filtered, setFiltered] = useState([]);

    const url = "https://68219a21259dad2655afc28a.mockapi.io/Characters"

    useEffect(() => {
        axios.get(url)
            .then((res) => {
                setCharacters(res.data)

                setFiltered(res.data);
            })

    }, []);

    const AddCharater = () => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (!user) {
            alert("You must be logged in to add a character.")
            return;
        }
        if (!name || !image) {
            alert("Please fill all fields")
            return
        }
        
        if (!image.startsWith("http") || !image.includes(".")) {
            alert("Please enter a valid image URL");
            return;
        }
        axios
            .post(url, {
                name,
                gender,
                image,
                userId: user.id
            })
            .then((res) => {
                const updated = [...characters, res.data];
                setCharacters(updated);
                setFiltered(updated);
            })

        setName("")
        setGender("male")
        setImage("")
    }


    const searchBtn = () => {
        const result = characters.filter((char) =>
            char.name.toLowerCase().includes(search.toLowerCase())
        )
        setFiltered(result);
    }

    const deleteBtn = (id) => {
        if (confirm("Are you sure you want to delete this character?")) {
            axios.delete(`${url}/${id}`).then(() => {
                const updated = characters.filter((char) => char.id !== id)
                setCharacters(updated)
                setFiltered(updated)
            })
        }
    }


    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-8">Characters</h2>


            <div className="flex justify-center flex-col items-center mb-10">
                <div className="w-full lg:w-3/6">
                    <input type="text"
                        placeholder="search for character "
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="mb-6 p-2 border rounded w-2/6" />
                    <button onClick={searchBtn}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 m-3">
                        Search</button>
                    {/* <button onClick={}
                        className="text-indigo-600 bg-white border border-indigo-600 px-4 py-2 rounded
                         hover:bg-indigo-700 hover:text-white">
                        Reset</button> */}


                </div>

                <div className="bg-white p-4 mb-6 rounded shadow-md w-full lg:w-3/6">
                    <h3 className="text-xl font-bold mb-2">Add new character:</h3>

                    <input type="text"
                        placeholder="image url" value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full mb-2 p-2 border rounded" />

                    <input type="text" placeholder="Charater name" value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mb-2 p-2 border rounded" />

                    <select value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full mb-2 p-2 border rounded">

                        <option>male</option>
                        <option>female</option>

                    </select>

                    <button onClick={AddCharater}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                        Add </button>
                </div>
            </div>



            {filtered.length === 0 ?
                (
                    <p className="text-center text-gray-500 text-xl mt-10">Oops! No charaters</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((char) => (
                            <div key={char.id} className="bg-white rounded shadow p-4 text-center">
                                <img
                                    src={char.image}
                                    alt={char.name}
                                    className="w-full h-48 object-cover rounded mb-3" />
                                <h4 className="text-xl font-bold text-indigo-700">{char.name}</h4>
                                <p className="text-gray-600">{char.gender}</p>

                                {JSON.parse(localStorage.getItem("user"))?.id === char.userId && (
                                    <button
                                        onClick={() => deleteBtn(char.id)}
                                        className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                                        Delete</button>
                                )}
                            </div>
                        ))}


                    </div>
                )}
        </div>
    )
}
