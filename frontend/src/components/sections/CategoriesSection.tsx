import Link from 'next/link';
import { ArrowRight, PenTool, Database, Briefcase, FileCode, DollarSign, Calculator, Users } from 'lucide-react';

const CATEGORIES = [
    { icon: PenTool, name: 'Design', active: false },
    { icon: Database, name: 'Sales', active: false },
    { icon: Briefcase, name: 'Marketing', active: true },
    { icon: DollarSign, name: 'Finance', active: false },
    { icon: FileCode, name: 'Technology', active: false },
    { icon: Calculator, name: 'Engineering', active: false },
    { icon: Briefcase, name: 'Business', active: false },
    { icon: Users, name: 'Human Resource', active: false },
];

interface CategoriesSectionProps {
    categoryCounts: Record<string, number>;
}

export default function CategoriesSection({ categoryCounts }: CategoriesSectionProps) {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container">
                <div className="flex items-end justify-between mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                        Explore by <span className="text-primary">category</span>
                    </h2>
                    <Link href="/categories" className="hidden md:flex items-center gap-2 text-primary font-medium hover:underline">
                        View all categories <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {CATEGORIES.map((cat, idx) => {
                        const count = categoryCounts[cat.name.toLowerCase()] || 0;
                        return (
                            <Link
                                href={`/jobs?category=${cat.name}`}
                                key={idx}
                                className={`group p-6 rounded-2xl border transition-all duration-300 ${cat.active
                                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25 scale-[1.02]'
                                    : 'bg-white border-gray-100 hover:border-primary-light hover:shadow-md hover:-translate-y-1'
                                    }`}
                            >
                                <cat.icon
                                    size={32}
                                    className={`mb-4 ${cat.active ? 'text-white' : 'text-primary'}`}
                                    strokeWidth={1.5}
                                />
                                <h3 className={`text-xl font-bold mb-2 ${cat.active ? 'text-white' : 'text-gray-900'}`}>{cat.name}</h3>
                                <div className="flex items-center justify-between">
                                    <p className={cat.active ? 'text-white/80' : 'text-gray-500'}>
                                        {count} {count === 1 ? 'job' : 'jobs'} available
                                    </p>
                                    <ArrowRight size={18} className={`opacity-0 group-hover:opacity-100 transition-opacity ${cat.active ? 'text-white' : 'text-primary'}`} />
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <Link href="/categories" className="mt-8 flex md:hidden items-center justify-center gap-2 text-primary font-medium">
                    View all categories <ArrowRight size={16} />
                </Link>
            </div>
        </section>
    );
}
