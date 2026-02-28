'use client';

import Link from 'next/link';
import { PenTool, Database, Briefcase, FileCode, Landmark, DollarSign, Calculator, Users, ArrowRight } from 'lucide-react';

const categories = [
    { icon: PenTool, name: 'Design', count: '235' },
    { icon: Database, name: 'Sales', count: '78' },
    { icon: Briefcase, name: 'Marketing', count: '140' },
    { icon: DollarSign, name: 'Finance', count: '325' },
    { icon: FileCode, name: 'Technology', count: '436' },
    { icon: Calculator, name: 'Engineering', count: '542' },
    { icon: Landmark, name: 'Business', count: '211' },
    { icon: Users, name: 'Human Resource', count: '346' },
];

export default function CategoriesPage() {
    return (
        <div className="container mx-auto px-6 py-20 min-h-screen">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Browse by <span className="text-primary">Category</span></h1>
            <p className="text-gray-500 mb-12 max-w-2xl text-lg">Find the specific industry or role you're looking for. We have thousands of jobs spread across various categories.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((cat, idx) => (
                    <Link
                        href={`/jobs?category=${encodeURIComponent(cat.name)}`}
                        key={idx}
                        className="group p-6 rounded-2xl border bg-white border-gray-100 hover:border-primary-light hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                    >
                        <cat.icon
                            size={32}
                            className="mb-4 text-primary"
                            strokeWidth={1.5}
                        />
                        <h3 className="text-xl font-bold mb-2 text-gray-900">{cat.name}</h3>
                        <div className="flex items-center justify-between">
                            <p className="text-gray-500">
                                {cat.count} jobs available
                            </p>
                            <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-16 text-center">
                <Link href="/jobs" className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover transition shadow-sm">
                    View All Jobs
                </Link>
            </div>
        </div>
    );
}
