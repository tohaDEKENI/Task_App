'use client'
import { UserButton } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import AddTaskForm from "./components/AddTaskForm";
import Gettasks from "./components/getTasks";
import UpdateForm from "./components/updateForm";
import { useEffect, useState } from "react";
import Link from "next/link";
const Page = () => {
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
    <div className="md:h-screen bg-gray-200 h-auto">
      <Navbar />
      <main className="pt-20 flex flex-col-reverse sm:flex-row max-w-10/12 m-auto items-center justify-center h-full ">
        <div className="h-full w-full border-l-8 md:block hidden border-gray-400">
          <AddTaskForm tasks={tasks} setTasks={setTasks} />
        </div>
        <div className="h-full w-full md:block justify-center border-l-8 border-gray-400 border-r-8 hidden bg-white">
          <Gettasks tasks={tasks} setTasks={setTasks} updateWindow={updateWindow} setUpdateWindow={setUpdateWindow} setTaskId={setTaskId} />
        </div>
        {updateWindow && taskId && updateData && (
          <div
            className="fixed w-full h-full bg-black/50 self-center"
            onClick={() => { setUpdateWindow(false), setTaskId(null) }}
          >
            <div>
              <UpdateForm setTasks={setTasks} updateWindow={updateWindow} setUpdateWindow={setUpdateWindow} updateData={updateData} />
            </div>
          </div>
        )}

      </main>

      <main className="p-6 max-w-3xl mx-auto text-center md:hidden flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-6">Tâches Zen</h1>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link href={"/AddTasks"}
               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >➕ Ajouter une tâche
          </Link>
          <Link href={"/ShowTasks"}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
          >📋 
          Voir mes tâches
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Page;