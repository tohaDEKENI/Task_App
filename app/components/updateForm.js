'use client'
const UpdateForm = ({updateWindow,setUpdateWindow,updateData}) => {
   
    console.log("Cote Leue"+updateData?.title)

    return (

        <div className="p-6 max-w-3xl mx-auto w-full bg-blue-50 self-center" onClick={(e) => e.stopPropagation()}>
            <form  className="flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-neutral-800 mb-4">Modifier une tâche</h2>

                <div className="flex flex-col">
                    <label className="font-semibold mb-2">Titre :</label>
                    <input
                        type="text"
                        placeholder="Titre de la tâche"
                        className="border p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        name="title"
                        required
                        defaultValue={updateData.title}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold mb-2">Date :</label>
                    <input
                        type="date"
                        className="border p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        name="due_date"
                        required
                        defaultValue={updateData.due_date.substring(0, 10)}
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
                            defaultValue={updateData.heure_debut}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="font-semibold mb-2">Heure de fin :</label>
                        <input
                            type="time"
                            className="border p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            name="heure_fin"
                            required
                            defaultValue={updateData.heure_fin}
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
                        defaultValue={updateData.description}
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                    Modifier la tâche
                </button>
            </form>
        </div>
    );
}

export default UpdateForm;