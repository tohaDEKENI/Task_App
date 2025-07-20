"use client"
import Navbar from "../components/Navbar";
import Gettasks from "../components/getTasks";
import { useState, useEffect } from "react";
import UpdateForm from "../components/updateForm";
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
                    className="fixed w-full h-full bg-black/50 self-center top-15 left-0"
                    onClick={() => { setUpdateWindow(false), setTaskId(null) }}
                >
                    <div>
                        <UpdateForm setTasks={setTasks} updateWindow={updateWindow} setUpdateWindow={setUpdateWindow} updateData={updateData} />
                    </div>
                </div>
            )}


        </div>
    );
}

export default AddTage;