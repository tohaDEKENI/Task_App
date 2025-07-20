'use client';
import { useState ,useEffect} from 'react';

const AddTaskForm = ({ tasks, setTasks }) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [heureDebut, setHeureDebut] = useState('');
    const [heureFin, setHeureFin] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [caractere, setCaractere] = useState(400)
    const [isMessage, setIsMage] = useState(false)

    useEffect(() => {
        if (isMessage) {
            const timer = setTimeout(() => {
                setIsMage(false); // cache le message
            }, 5000);

            // Nettoyage si le composant est démonté avant les 5 secondes
            return () => clearTimeout(timer);
        }
    }, [isMessage]);
    const maxCaracter = 400;

    const charCaracter = maxCaracter - description.length
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
                setIsMage(true)
                fetch("/api/Tasks")
                    .then(res => res.json())
                    .then(data => {
                        setTasks(data)
                    })

            } else {
                const errorText = await res.text();
                setMessage(`❌ Erreur : ${errorText}`);
            }
            //window.location.reload()

        } catch (error) {
            setMessage(`❌ Erreur réseau : ${error.message}`);
        }
    }


    return (
        <div className="p-6 max-w-3xl mx-auto w-full bg-blue-50">
            <form onSubmit={postData} className="flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-neutral-800 mb-4">Ajouter une tâche</h2>

                <div className="flex flex-col">
                    <label className="font-semibold mb-2">Titre :</label>
                    <input
                        type="text"
                        placeholder="Titre de la tâche"
                        className="border p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 break-words input input-primary w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        maxLength={50}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="font-semibold mb-2">Date :</label>
                    <input
                        type="date"
                        className="border p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 input input-primary w-full"
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
                            className="border p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 input input-primary w-full"
                            value={heureDebut}
                            onChange={(e) => setHeureDebut(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="font-semibold mb-2">Heure de fin :</label>
                        <input
                            type="time"
                            className="border p-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 input input-primary w-full"
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
                        className="border p-4 rounded-lg h-48 resize-none outline-none focus:ring-2 focus:ring-blue-500 textarea textarea-primary w-full"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                        required
                        maxLength={400}
                    />
                    <p>{charCaracter}  caractères restants.</p>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition font-semibold cursor-pointer btn btn-primary"
                >
                    Ajouter la tâche
                </button>

                {isMessage &&
                    <div role="alert" className="alert alert-success absolute top-25 left-25">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{message}</span>
                    </div>
                }
            </form>
        </div>
    );
};

export default AddTaskForm;
