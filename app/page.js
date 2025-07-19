'use client'
import { UserButton } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import AddTaskForm from "./components/AddTaskForm";
import Gettasks from "./components/getTasks";
import UpdateForm from "./components/updateForm";
import { useEffect, useState } from "react";
const Page = () => {
  const [tasks, setTasks] = useState([]);
  const [updateWindow, setUpdateWindow] = useState(false)
  const [taskId, setTaskId] = useState(null)
  const [updateData, setUpdateData] = useState([])

  useEffect(() => {
    if (taskId) {
      fetch("http://localhost:3000/api/Tasks/" + taskId)
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
    <div className="h-screen bg-gray-200 ">
      <Navbar />
      <main className="pt-20 flex flex-col-reverse sm:flex-row max-w-10/12 m-auto items-center justify-center h-full ">
        <div className="  h-full w-full border-l-8 ">
          <AddTaskForm tasks={tasks} setTasks={setTasks} />
        </div>
        <div className="h-full w-full md:flex justify-center border-l-8 border-r-8 hidden bg-white">
          <Gettasks tasks={tasks} setTasks={setTasks} updateWindow={updateWindow} setUpdateWindow={setUpdateWindow} setTaskId={setTaskId} />
        </div>
        {updateWindow && taskId && updateData && (
          <div
            className="fixed w-full h-full bg-black/25 self-center"
            onClick={() => {setUpdateWindow(false),setTaskId(null)}}
          >
            <div>
              <UpdateForm updateWindow={updateWindow} setUpdateWindow={setUpdateWindow} updateData={updateData} />
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default Page;