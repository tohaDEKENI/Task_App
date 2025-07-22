'use client'

import { useEffect, useState } from "react";


const UpdateForm = ({ setTasks, updateWindow, setUpdateWindow, updateData }) => {

    const [message, setMessage] = useState("")
    const [isMessage,setIsMessage] = useState(false)
    const [formData, setFormDate] = useState({
        title: "",
        due_date: "",
        heure_debut: "",
        heure_fin: "",
        description: ""
    })

    useEffect(() => (
        setFormDate({
            title: updateData.title || "",
            due_date: updateData.due_date ? updateData.due_date.substring(0, 10) : "",
            heure_debut: updateData.heure_debut || "",
            heure_fin: updateData.heure_fin || "",
            description: updateData.description || ""
        })
    ), [])

    function handleChange(e) {
        const { name, value } = e.target;
        setFormDate(prev => ({ ...prev, [name]: value }));
        console.log(formData)
    }

    async function updateDataForm(e) {
        e.preventDefault()
        const res = await fetch('/api/Tasks/' + updateData.id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })

        const data = await res.json()
        if (data) {
            setFormDate({
                title: "",
                due_date: "",
                heure_debut: "",
                heure_fin: "",
                description: ""
            })
            setMessage(data.message)
            setIsMessage(true)
            fetch("/api/Tasks")
                .then(res => res.json())
                .then(data => {
                    setTasks(data)
                })
        }


    }

    return (

        <div className="p-6 max-w-3xl mx-auto w-full bg-blue-50 self-center rounded-md" onClick={(e) => e.stopPropagation()}>
            
            <form className="flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-200" onSubmit={updateDataForm}>
                {
                    isMessage && (
                        <h1 className="text-center bg-green-400 py-1 rounded-md text-white">{message}</h1>
                    )
                }

                <h2 className="text-3xl font-bold text-center text-neutral-800 mb-4">Modifier une tâche</h2>

                <div className="flex flex-col">
                    <label className="font-semibold mb-2">Titre :</label>
                    <input
                        type="text"
                        placeholder="Titre de la tâche"
                        className="border p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold mb-2">Date :</label>
                    <input
                        type="date"
                        className="border p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        name="due_date"
                        required
                        value={formData.due_date.substring(0, 10)}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col w-full">
                        <label className="font-semibold mb-2">Heure de début :</label>
                        <input
                            type="time"
                            className="border p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            name="heure_debut"
                            required
                            value={formData.heure_debut}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="font-semibold mb-2">Heure de fin :</label>
                        <input
                            type="time"
                            className="border p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            name="heure_fin"
                            required
                            value={formData.heure_fin}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold mb-2">Description :</label>
                    <textarea
                        placeholder="Description détaillée de la tâche"
                        className="border p-4 rounded-lg h-48 resize-none outline-none focus:ring-2 focus:ring-blue-500"
                        name="description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        maxLength={400 }
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold cursor-pointer"
                >
                    Modifier la tâche
                </button>
            </form>
        </div>
    );
}

export default UpdateForm;