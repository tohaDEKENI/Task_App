'use client'
import { UserButton } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import AddTaskForm from "./components/AddTaskForm";
import Gettasks from "./components/getTasks";
import { useState } from "react";
const Page = () => {
  const [tasks, setTasks] = useState([]);

  return ( 
    <div className="h-screen bg-gray-200 ">
        <Navbar/>
        <main className="pt-20 flex flex-col-reverse sm:flex-row max-w-10/12 m-auto items-center justify-center h-full ">
          <div  className="  h-full w-full border-l-8 ">  
             <AddTaskForm tasks={tasks} setTasks={setTasks}/>
          </div>
          <div className="h-full w-full md:flex justify-center border-l-8 border-r-8 hidden bg-white">
            <Gettasks tasks={tasks} setTasks={setTasks}/>
          </div>
        </main>
    </div>
  );
}
 
export default Page;