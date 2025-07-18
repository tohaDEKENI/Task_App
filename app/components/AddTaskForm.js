'use client';
import { useState } from 'react';

const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [heureDebut, setHeureDebut] = useState('');
  const [heureFin, setHeureFin] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  async function postData(e) {
    e.preventDefault();
    setMessage('');

    const task = {
      title,
      due_date: dueDate,
      heure_debut: heureDebut,
      heure_fin: heureFin,
      description
    };

    try {
      const res = await fetch('/api/Tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });

      if (res.ok) {
        setMessage('✅ Tâche ajoutée avec succès !');
        setTitle('');
        setDueDate('');
        setHeureDebut('');
        setHeureFin('');
        setDescription('');
      } else {
        const errorText = await res.text();
        setMessage(`❌ Erreur : ${errorText}`);
      }
    } catch (error) {
      setMessage(`❌ Erreur réseau : ${error.message}`);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto w-full">
      <form onSubmit={postData} className="flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-neutral-800 mb-4">Ajouter une tâche</h2>

        <div className="flex flex-col">
          <label className="font-semibold mb-2">Titre :</label>
          <input
            type="text"
            placeholder="Titre de la tâche"
            className="border p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-2">Date :</label>
          <input
            type="date"
            className="border p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col w-full">
            <label className="font-semibold mb-2">Heure de début :</label>
            <input
              type="time"
              className="border p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={heureDebut}
              onChange={(e) => setHeureDebut(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="font-semibold mb-2">Heure de fin :</label>
            <input
              type="time"
              className="border p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              value={heureFin}
              onChange={(e) => setHeureFin(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-2">Description :</label>
          <textarea
            placeholder="Description détaillée de la tâche"
            className="border p-4 rounded-lg h-48 resize-none outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Ajouter la tâche
        </button>

        {message && <p className="text-md text-center text-gray-700">{message}</p>}
      </form>
    </div>
  );
};

export default AddTaskForm;
