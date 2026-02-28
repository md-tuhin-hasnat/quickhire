import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import JobCard from '@/components/JobCard';

interface Job {
    _id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    category: string;
}

interface LatestJobsProps {
    jobs: Job[];
    loading: boolean;
}

export default function LatestJobs({ jobs, loading }: LatestJobsProps) {
    return (
        <section className="py-20 bg-gray-50 border-t border-gray-100">
            <div className="container">
                <div className="flex items-end justify-between mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                        Latest <span className="text-primary">jobs open</span>
                    </h2>
                    <Link href="/jobs" className="hidden md:flex items-center gap-2 text-primary font-medium hover:underline">
                        Show all jobs <ArrowRight size={16} />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {jobs.map((job) => (
                            <JobCard
                                key={job._id}
                                id={job._id}
                                title={job.title}
                                company={job.company}
                                location={job.location}
                                type={job.type}
                                tags={[job.category]}
                                logoBg="bg-blue-600 text-white"
                                layout="horizontal"
                            />
                        ))}
                    </div>
                )}

                <div className="mt-12 text-center">
                    <Link
                        href="/jobs"
                        className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-white hover:border-gray-300 transition shadow-sm bg-gray-50"
                    >
                        View All Jobs
                    </Link>
                </div>
            </div>
        </section>
    );
}
