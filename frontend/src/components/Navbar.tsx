import Link from 'next/link';
import { Briefcase } from 'lucide-react';

export default function Navbar() {
    return (
        <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center">
                        <Briefcase size={20} strokeWidth={2.5} />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900">QuickHire</span>
                </Link>
                <nav className="hidden md:flex gap-8 items-center">
                    <Link href="/" className="text-gray-600 hover:text-primary font-medium transition-colors">Find Jobs</Link>
                    <Link href="/companies" className="text-gray-600 hover:text-primary font-medium transition-colors">Companies</Link>
                </nav>
                <div className="flex items-center gap-6">
                    <Link href="/admin" className="text-gray-600 hover:text-primary font-medium hidden md:block transition-colors">
                        Post a Job
                    </Link>
                    <Link href="/login" className="text-primary font-medium hover:underline transition-all">Login</Link>
                    <Link href="/signup" className="px-5 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition shadow-sm">
                        Sign Up
                    </Link>
                </div>
            </div>
        </header>
    );
}
