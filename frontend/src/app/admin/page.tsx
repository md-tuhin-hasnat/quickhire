'use client';

import { useState } from 'react';
import { Plus, Trash2, Search, Building2, MapPin } from 'lucide-react';

export default function AdminDashboard() {
    const [jobs, setJobs] = useState([
        { id: '1', title: 'Brand Designer', company: 'Dropbox', location: 'San Francisco, USA', type: 'Full Time', tags: ['Design', 'Business'], date: '2024-03-24' },
        { id: '2', title: 'Social Media Assistant', company: 'Nomad', location: 'Paris, France', type: 'Full Time', tags: ['Marketing'], date: '2024-03-23' },
        { id: '3', title: 'Interactive Developer', company: 'Terraform', location: 'Hamburg, Germany', type: 'Full Time', tags: ['Engineering'], date: '2024-03-22' }
    ]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '', company: '', location: '', type: 'Full Time', category: 'Design', tags: '', description: ''
    });

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this job?')) {
            setJobs(jobs.filter(job => job.id !== id));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const newJob = {
            id: Date.now().toString(),
            title: formData.title,
            company: formData.company,
            location: formData.location,
            type: formData.type,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(t => t),
            date: new Date().toISOString().split('T')[0]
        };
        setJobs([newJob, ...jobs]);
        setShowCreateModal(false);
        setFormData({ title: '', company: '', location: '', type: 'Full Time', category: 'Design', tags: '', description: '' });
    };

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4 md:px-6">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
                        <p className="text-gray-500">Manage all job postings in one place.</p>
                    </div>
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover transition shadow-sm w-full md:w-auto"
                    >
                        <Plus size={20} /> Post New Job
                    </button>
                </div>

                {/* Dashboard Content */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <h2 className="text-lg font-bold text-gray-900">Active Listings ({jobs.length})</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search jobs..."
                                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm w-64"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Job Role</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Posted</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {jobs.map((job) => (
                                    <tr key={job.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-gray-900">{job.title}</span>
                                                <span className="text-xs text-gray-500 mt-1">{job.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <Building2 size={16} className="text-gray-400" /> {job.company}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-700">
                                                <MapPin size={16} className="text-gray-400" /> {job.location}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {job.date}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(job.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none"
                                                title="Delete Job"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {jobs.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                            No jobs found. Post a new job to see it here.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
                            <h2 className="text-2xl font-bold text-gray-900">Post a New Job</h2>
                            <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>

                        <form onSubmit={handleCreate} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                                    <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="e.g. Senior Product Designer" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                                    <input required type="text" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="e.g. OpenAI" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                                    <input required type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="e.g. Remote, San Francisco" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                                    <select name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white font-sans text-gray-900">
                                        <option value="Full Time">Full Time</option>
                                        <option value="Part Time">Part Time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Freelance">Freelance</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white font-sans text-gray-900">
                                        <option value="Design">Design</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Sales">Sales</option>
                                        <option value="Business">Business</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                                    <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="e.g. React, UX, Content" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Job Description *</label>
                                <textarea required name="description" rows={5} value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-y" placeholder="Describe the role, responsibilities, and requirements..."></textarea>
                            </div>

                            <div className="pt-4 flex justify-end gap-3 sticky bottom-0">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="px-6 py-2.5 font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 font-medium text-white bg-primary hover:bg-primary-hover rounded-lg transition shadow-sm">Post Job</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
