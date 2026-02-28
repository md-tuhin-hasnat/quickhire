import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import JobCard from '@/components/JobCard';

interface Job {
    _id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description?: string;
    category: string;
}

interface FeaturedJobsProps {
    jobs: Job[];
    loading: boolean;
}

export default function FeaturedJobs({ jobs, loading }: FeaturedJobsProps) {
    return (
        <section className="py-20 bg-white">
            <div className="container">
                <div className="flex items-end justify-between mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                        Featured <span className="text-primary">jobs</span>
                    </h2>
                    <Link href="/jobs?featured=true" className="hidden md:flex items-center gap-2 text-primary font-medium hover:underline">
                        View all jobs <ArrowRight size={16} />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {jobs.map((job) => (
                            <JobCard
                                key={job._id}
                                id={job._id}
                                title={job.title}
                                company={job.company}
                                location={job.location}
                                type={job.type}
                                description={job.description}
                                tags={[job.category]}
                                logoBg="bg-blue-600 text-white"
                                featured={true}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
