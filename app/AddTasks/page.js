import AddTaskForm from "../components/AddTaskForm";
import Navbar from "../components/Navbar";
const AddTage = () => {
    return (
        <div className="h-screen">
            <div className="block">
                <Navbar  />
            </div>
            <div className="pt-20">
                <AddTaskForm />
            </div>

        </div>
    );
}

export default AddTage;