'use client'
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
const Statistique = () => {
    const [statistique, setStatistique] = useState([])
    const [total, setTotal] = useState("")
    const [done, setDone] = useState("")
    const [unfinish, setUnfinish] = useState("")
    const [pourcentage, setPourcentage] = useState("")
    useEffect(() => {
        fetch("/api/statistique")
            .then(res => res.json())
            .then(data => {
                setStatistique(data);
                setTotal(data.allCount[0].allTasks)
                setDone(data.doneTasks[0].doneTasks)
                setUnfinish(data.UnfinishTask[0].unfinish)
                setPourcentage(data.pourcentage)
            })
    }, [])

    return (
        <div className="bg-gray-200">
            <Navbar />
            <div className="flex items-center justify-center flex-col h-screen ">
                <h1 className="text-center text-4xl mb-4">Statistique</h1>
                <div className="overflow-x-auto w-full mt-8 px-2">
                    <div className="max-w-4xl mx-auto rounded-box border border-base-content/10 bg-base-100 shadow-md">
                        <table className="table table-zebra text-sm sm:text-base w-full">
                            <thead className="bg-neutral text-neutral-content text-xs sm:text-sm">
                                <tr>
                                    <th className="whitespace-nowrap">#</th>
                                    <th className="whitespace-nowrap">📊 Statistique</th>
                                    <th className="whitespace-nowrap">📌 Valeur</th>
                                    <th className="whitespace-nowrap">💬 Commentaire</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Total des tâches */}
                                <tr>
                                    <th className="font-bold">1</th>
                                    <td className="whitespace-nowrap">Nombre total de tâches</td>
                                    <td>
                                        <span className="badge badge-primary badge-lg text-white">{total}</span>
                                    </td>
                                    <td className="text-gray-500 italic whitespace-nowrap">Toutes les tâches créées</td>
                                </tr>

                                {/* Tâches faites */}
                                <tr>
                                    <th className="font-bold">2</th>
                                    <td className="whitespace-nowrap">Tâches faites ✅</td>
                                    <td>
                                        <span className="badge badge-success badge-lg text-white">{done}</span>
                                    </td>
                                    <td className="text-green-500 whitespace-nowrap">Super boulot !</td>
                                </tr>

                                {/* Tâches restantes */}
                                <tr>
                                    <th className="font-bold">3</th>
                                    <td className="whitespace-nowrap">Tâches restantes ⏳</td>
                                    <td>
                                        <span className="badge badge-warning badge-lg text-white">{unfinish}</span>
                                    </td>
                                    <td className="text-yellow-600 whitespace-nowrap">À finir bientôt</td>
                                </tr>

                                {/* Pourcentage */}
                                <tr>
                                    <th className="font-bold">4</th>
                                    <td className="whitespace-nowrap">Avancement (%) 📈</td>
                                    <td className="w-56 max-w-full">
                                        <progress
                                            className="progress progress-info w-full sm:w-56"
                                            value={pourcentage}
                                            max="100"
                                        ></progress>
                                    </td>
                                    <td className="text-blue-500 font-semibold whitespace-nowrap">{pourcentage}% terminé</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Statistique;