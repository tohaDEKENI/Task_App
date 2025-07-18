
import Link from "next/link";
const LanddingPage = () => {
    return (
        <div className="flex-1 bg-green-700 text-white flex flex-col items-center justify-center p-8"
         style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
        >
            <div className="max-w-md w-full">
                <h1 className="mb-6 text-center text-5xl font-extrabold">Bienvenue sur <span className="underline">TaskMaster</span> ✨</h1>

                <ul className=" pl-6 space-y-2 mb-8 text-lg list-none">
                    <li>📅 Organisez vos journées simplement</li>
                    <li>🔔 Recevez des rappels pour vos tâches importantes</li>
                    <li>📈 Suivez votre productivité</li>
                </ul>

                <div className="bg-white text-gray-800 p-4 rounded shadow space-y-3">
                    <p className="font-semibold">Exemples de tâches :</p>
                    <ul className="space-y-2">
                        <li className="bg-gray-100 p-3 rounded">📌 Faire les courses</li>
                        <li className="bg-gray-100 p-3 rounded">📌 Étudier React</li>
                        <li className="bg-gray-100 p-3 rounded">📌 Appeler maman</li>
                    </ul>
                </div>
                <div className="space-x-8 py-8">
                    <Link href={`/sign-in`} className="bg-white text-black py-2 px-8 rounded-md hover:bg-gray-300">Se connecter</Link>
                    <Link href={`/sign-up`} className="py-2 px-8 border rounded-md hover:bg-white hover:text-black">S’inscrire</Link>
                </div>
            </div>
        </div>
    );
}

export default LanddingPage;