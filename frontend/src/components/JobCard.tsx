import Link from 'next/link';
import { Building2 } from 'lucide-react';

interface JobCardProps {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    description?: string;
    tags: string[];
    logoBg?: string;
    featured?: boolean;
    layout?: 'vertical' | 'horizontal';
}

export default function JobCard({
    id, title, company, location, type, description, tags, logoBg = 'bg-gray-100', featured = false, layout = 'vertical'
}: JobCardProps) {
    if (layout === 'horizontal') {
        return (
            <div className="bg-white p-6 border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col sm:flex-row sm:items-center gap-6 relative group">
                <div className={`w-14 h-14 shrink-0 rounded-xl flex items-center justify-center text-2xl font-bold ${logoBg}`}>
                    {company ? company.charAt(0).toUpperCase() : <Building2 className="text-gray-400" />}
                </div>
                <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                        <Link href={`/jobs/${id}`} className="focus:outline-none">
                            {title}
                            <span className="absolute inset-0" aria-hidden="true"></span>
                        </Link>
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{company}</p>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-2 mt-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600 border border-green-100">
                            {type}
                        </span>

                        {/* Divider + Location in horizontal flow */}
                        <div className="flex items-center gap-2 px-1 text-sm text-gray-500">
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span>{location}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        </div>

                        {tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className={`px-3 py-1 rounded-full text-xs font-medium border bg-white ${tag.toLowerCase() === 'marketing' ? 'text-orange-500 border-orange-200' :
                                    tag.toLowerCase() === 'design' ? 'text-indigo-500 border-indigo-200' :
                                        tag.toLowerCase() === 'management' ? 'text-purple-500 border-purple-200' :
                                            'text-gray-500 border-gray-200'
                                    }`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative group bg-white rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full ${featured ? 'border-primary/20 shadow-md' : 'border-gray-100'}`}>
            <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${logoBg}`}>
                    {/* Fallback to first letter of company, or Building icon if none */}
                    {company ? company.charAt(0).toUpperCase() : <Building2 className="text-gray-400" />}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-primary border border-blue-100">
                    {type}
                </span>
            </div>

            <div className="mb-4 flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                    <Link href={`/jobs/${id}`} className="focus:outline-none">
                        {title}
                        <span className="absolute inset-0" aria-hidden="true"></span>
                    </Link>
                </h3>
                <p className="text-sm text-gray-500 mb-3">{company} • {location}</p>
                {description && (
                    <p className="text-sm text-gray-600 line-clamp-2" title={description.replace(/(<([^>]+)>)/gi, "")}>
                        {description.replace(/(<([^>]+)>)/gi, "")}
                    </p>
                )}
            </div>

            <div className="mt-auto flex items-center justify-between pt-4">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${tag.toLowerCase() === 'marketing' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                tag.toLowerCase() === 'design' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                    tag.toLowerCase() === 'management' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                        'bg-gray-50 text-gray-600 border-gray-100'
                                }`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
