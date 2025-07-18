'use client';
import { useEffect, useState } from "react";

const Gettasks = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    fetch("/api/Tasks")
      .then(res => res.json())
      .then(data => {
        setTasks(data);
      })
      .catch(err => {
        console.error("Erreur lors du chargement des tâches :", err);
      });
  }, []);

  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const paginatedTasks = tasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 max-w-4xl w-full mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-neutral-800">🗂️ Liste des tâches</h2>

      {paginatedTasks.length === 0 ? (
        <p className="text-center text-gray-500">Aucune tâche trouvée.</p>
      ) : (
        <div className="space-y-4">
          {paginatedTasks.map((task, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-blue-600">{task.title}</h3>
              <p className="text-gray-600 mt-2 mb-3">{task.description}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                <p>📅 <strong>Date :</strong> {task.due_date}</p>
                <p>🕒 <strong>De :</strong> {task.heure_debut} <strong>à</strong> {task.heure_fin}</p>
                <p>
                  📌 <strong>Statut :</strong>{" "}
                  <span className={`px-2 py-1 rounded text-white text-xs font-semibold ${task.is_done ? 'bg-green-500' : 'bg-yellow-500'}`}>
                    {task.is_done ? "Terminée ✅" : "En cours ⏳"}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tasks.length > itemsPerPage && (
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition disabled:opacity-50"
          >
            ⬅ Précédent
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} sur {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition disabled:opacity-50"
          >
            Suivant ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default Gettasks;
