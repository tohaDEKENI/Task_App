import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { House } from 'lucide-react'

export default function Navbar() {
  return (
     <div className="navbar bg-white shadow-md fixed top-0 left-0 w-full z-50 px-4">
      {/* Menu mobile (hamburger) */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round"
                 strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </label>
          <ul tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <SignedIn>
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/ShowTasks">Mes Tâches</Link></li>
              <li><Link href="/AddTasks">➕ Nouvelle Tâche</Link></li>
            </SignedIn>
            <SignedOut>
              <li><SignInButton><span>Se connecter</span></SignInButton></li>
              <li><SignUpButton><span>Créer un compte</span></SignUpButton></li>
            </SignedOut>
          </ul>
        </div>

        {/* Logo */}
        <Link href="/" className="text-xl font-bold flex items-center gap-2">
          <House className="w-6 h-6" />
          Tâches <span className="text-blue-500">Zen</span>
        </Link>
      </div>

      {/* Menu Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          <SignedIn>
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/ShowTasks">Mes Tâches</Link></li>
            <li><Link href="/AddTasks">➕ Nouvelle Tâche</Link></li>
          </SignedIn>
        </ul>
      </div>

      {/* Boutons droite */}
      <div className="navbar-end gap-2">
        <SignedOut>
          <SignInButton>
            <button className="btn btn-outline btn-sm">Se connecter</button>
          </SignInButton>
          <SignUpButton>
            <button className="btn btn-primary btn-sm text-white">Créer un compte</button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </div>

  );
}
