"use client"
import Navbar from "../components/Navbar";
import Gettasks from "../components/getTasks";
import { useState, useEffect } from "react";
import UpdateForm from "../components/updateForm";
import { X } from 'lucide-react'
const AddTage = () => {

    const [tasks, setTasks] = useState([]);
    const [updateWindow, setUpdateWindow] = useState(false)
    const [taskId, setTaskId] = useState(null)
    const [updateData, setUpdateData] = useState([])

    useEffect(() => {
        if (taskId) {
            fetch("/api/Tasks/" + taskId)
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data) && data.length > 0) {
                        setUpdateData(data[0]);
                        setUpdateWindow(true)

                        console.log("Au niveu de useEffect " + data[0].title);
                    } else {
                        console.log("Aucune donnée trouvée pour l'id :", taskId);
                    }
                })
        }
    }, [taskId]);
    return (
        <div className="h-screen">
            <div className="block">
                <Navbar />
            </div>
            <div className="pt-20">
                <Gettasks tasks={tasks} setTasks={setTasks} updateWindow={updateWindow} setUpdateWindow={setUpdateWindow} setTaskId={setTaskId} />
            </div>
            {updateWindow && taskId && updateData && (
                <div
                    className="fixed  inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto px-4 py-10"
                    onClick={() => {
                        setUpdateWindow(false);
                        setTaskId(null);
                    }}
                >

                    <div
                        className="relative bg-white rounded-lg shadow-lg w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <p onClick={() => setUpdateData(false)} className="absolute right-0 cursor-pointer">
                            <X className="text-5xl text-blue-400 font-extrabold" />
                        </p>                        <UpdateForm
                            setTasks={setTasks}
                            updateWindow={updateWindow}
                            setUpdateWindow={setUpdateWindow}
                            updateData={updateData}
                        />
                    </div>
                </div>

            )}


        </div>
    );
}

export default AddTage;