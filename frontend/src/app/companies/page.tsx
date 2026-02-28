'use client';

import Link from 'next/link';

export default function CompaniesPage() {
    return (
        <div className="container mx-auto px-6 py-20 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Top <span className="text-primary">Companies</span></h1>
            <p className="text-gray-500 mb-12 max-w-2xl text-lg">Discover the best companies to work for. Browse reviews, salaries, and available job openings.</p>

            <div className="bg-blue-50 border border-blue-100 text-blue-800 p-8 rounded-2xl text-center max-w-3xl mx-auto mt-20">
                <h3 className="text-2xl font-bold mb-3">Companies Page Coming Soon!</h3>
                <p className="mb-6 opacity-80 text-lg">We are currently aggregating data from top employers to bring you comprehensive company profiles.</p>
                <Link href="/jobs" className="inline-block px-8 py-3.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover shadow-sm transition-all">
                    Browse All Jobs Instead
                </Link>
            </div>
        </div>
    );
}
