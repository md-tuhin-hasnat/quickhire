'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, MapPin, Building2, Clock, DollarSign, Calendar, Target } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function JobDetailPage() {
    const params = useParams();
    const id = params.id as string;

    interface Job {
        _id: string;
        title: string;
        company: string;
        location: string;
        type: string;
        category: string;
        description: string;
        created_at: string;
        salary?: string;
    }

    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/jobs/${id}`);
                const data = await res.json();
                if (data.success) {
                    setJob(data.data);
                }
            } catch (error) {
                console.error('Error fetching job details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchJob();
        }
    }, [id]);

    // Format date fallback helper
    const formatDate = (dateString?: string) => {
        if (!dateString) return 'Recently';
        const d = new Date(dateString);
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resume_link: '',
        cover_note: ''
    });

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (submitted) {
        return (
            <div className="container mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <Target size={32} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
                <p className="text-gray-600 text-center max-w-md mb-8">
                    Thank you for applying to the {job?.title} position at {job?.company}. We have received your application and will be in touch soon.
                </p>
                <Link href="/" className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition">
                    Back to Jobs
                </Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="bg-gray-50 min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!job && !loading) {
        return (
            <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h1>
                <Link href="/jobs" className="text-primary hover:underline">Return to job listings</Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="container mx-auto px-4 md:px-6">
                <Link href="/jobs" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 font-medium transition-colors">
                    <ArrowLeft size={16} /> Back to all jobs
                </Link>

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Main Job Details */}
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm mb-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                                    {job?.company?.[0] || <Building2 size={24} />}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-1">{job?.title}</h1>
                                    <p className="text-gray-500 text-lg flex items-center gap-2">
                                        <Building2 size={18} /> {job?.company}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 py-6 border-y border-gray-100 mb-8">
                                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                                    <MapPin size={18} className="text-primary" /> {job?.location}
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                                    <Clock size={18} className="text-primary" /> {job?.type}
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                                    <DollarSign size={18} className="text-primary" /> {job?.salary || 'Competitive'}
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                                    <Calendar size={18} className="text-primary" /> {formatDate(job?.created_at)}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                                <div
                                    className="prose prose-blue max-w-none text-gray-600 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: job?.description || '' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Application Form Sidebar */}
                    <div className="w-full lg:w-1/3 sticky top-24">
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl shadow-primary/5">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Apply for this job</h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition bg-gray-50 focus:bg-white"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition bg-gray-50 focus:bg-white"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Resume Link (URL) *</label>
                                    <input
                                        type="url"
                                        name="resume_link"
                                        required
                                        value={formData.resume_link}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition bg-gray-50 focus:bg-white"
                                        placeholder="https://linkedin.com/in/johndoe or Drive link"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover Note</label>
                                    <textarea
                                        name="cover_note"
                                        rows={4}
                                        value={formData.cover_note}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition bg-gray-50 focus:bg-white resize-none"
                                        placeholder="Tell us why you are a great fit..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                                >
                                    {submitting ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </span>
                                    ) : 'Submit Application'}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
