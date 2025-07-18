'use client'
import { UserButton } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import AddTaskForm from "./components/AddTaskForm";
import Gettasks from "./components/getTasks";
const Page = () => {

  return ( 
    <div className="h-screen">
        <Navbar/>
        <main className="pt-20 flex flex-col-reverse sm:flex-row max-w-10/12 m-auto items-center justify-center h-full ">
          <div  className="  h-full w-full border-l-8 ">  
             <AddTaskForm/>
          </div>
          <div className=" h-full w-full flex justify-center border-l-8 border-r-8">
            <Gettasks/>
          </div>
        </main>
    </div>
  );
}
 
export default Page;