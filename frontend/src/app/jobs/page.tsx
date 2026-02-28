'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import JobCard from '@/components/JobCard';

interface Job {
    _id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description: string;
    category: string;
}

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    useEffect(() => {
        fetchJobs();
    }, [searchTerm, categoryFilter]);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            let url = 'http://localhost:5000/api/jobs?';
            if (searchTerm) url += `search=${searchTerm}&`;
            if (categoryFilter) url += `category=${categoryFilter}&`;

            const res = await fetch(url);
            const data = await res.json();
            if (data.success) {
                setJobs(data.data);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['Design', 'Engineering', 'Marketing', 'Sales', 'Human Resource', 'Business'];

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-6 font-medium transition-colors">
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Next Job</h1>
                    <p className="text-gray-600">Browse through our extensive list of job openings.</p>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by job title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                        />
                    </div>
                    <div className="md:w-64 relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition appearance-none bg-white font-sans text-gray-900 cursor-pointer"
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : jobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map(job => (
                            <JobCard
                                key={job._id}
                                id={job._id}
                                title={job.title}
                                company={job.company}
                                location={job.location}
                                type={job.type}
                                description={job.description.replace(/(<([^>]+)>)/gi, "")}
                                tags={[job.category]}
                                logoBg="bg-blue-600 text-white"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-100 p-12 text-center shadow-sm">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="text-gray-400" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
                        <p className="text-gray-500">We couldn't find any jobs matching your criteria.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setCategoryFilter(''); }}
                            className="mt-6 px-6 py-2 bg-primary-light text-primary font-medium rounded-lg hover:bg-blue-100 transition"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
