import { SignUp } from '@clerk/nextjs';
import LanddingPage from '@/app/components/landdingPage';
import Navbar from '@/app/components/Navbar';

export default function Page() {
    return (
        <div>
            <Navbar />
            <div className="flex h-screen flex-col sm:flex-row">

                <div className="flex-1 flex items-center justify-center bg-gray-100">
                    <SignUp />
                </div>

                <LanddingPage />
            </div>
        </div>
    );
}
