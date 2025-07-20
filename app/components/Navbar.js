import { UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow fixed w-full navbar navbar-start ">
      <Link href="/" className="text-2xl font-bold">Tâches <span className="text-blue-400"> Zen </span></Link>
      
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton>
            <button className="btn">Se connecter</button>
          </SignInButton>
          <SignUpButton>
            <button className="btn">Créer un compte</button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <Link href="/tasks">Mes Tâches</Link>
          <Link href="/tasks/new">➕ Nouvelle Tâche</Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  );
}
