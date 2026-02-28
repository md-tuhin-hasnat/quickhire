'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';

const LOCATIONS = ['Florence, Italy', 'New York, USA', 'London, UK', 'San Francisco, USA'];

export default function HeroSection() {
    const router = useRouter();
    const [searchTitle, setSearchTitle] = useState('');
    const [searchLocation, setSearchLocation] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        let url = '/jobs?';
        if (searchTitle) url += `search=${encodeURIComponent(searchTitle)}&`;
        if (searchLocation) url += `location=${encodeURIComponent(searchLocation)}&`;
        router.push(url);
    };

    return (
        <section
            className="relative pt-2 pb-16 bg-white overflow-hidden"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 400px), calc(100% - 700px) 100%, 0 100%)' }}
        >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-light/50 blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-blue-100 blur-3xl opacity-50 pointer-events-none" />

            <div className="container relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="max-w-2xl">
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-6">
                        Discover <br />
                        more than <br />
                        <span className="text-primary relative inline-block">
                            5000+ Jobs
                            <svg className="absolute w-full h-4 -bottom-1 left-0 text-primary opacity-80" viewBox="0 0 200 20" preserveAspectRatio="none">
                                <path d="M0,10 Q100,20 200,5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                                <path d="M20,15 Q100,5 180,18" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
                            </svg>
                        </span>
                    </h1>
                    <p className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed">
                        Great platform for the job seeker that is searching for new career heights and passionate about startups.
                    </p>

                    {/* Search Box */}
                    <form
                        onSubmit={handleSearch}
                        className="bg-white p-2 rounded shadow-[0_15px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col md:flex-row items-center gap-2 relative z-20 w-full max-w-4xl lg:w-[120%] lg:-mr-[20%] xl:w-[130%] xl:-mr-[30%]"
                    >
                        <div className="flex-1 flex items-center gap-3 px-4 py-4 w-full md:w-auto relative after:content-[''] after:hidden md:after:block after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-px after:h-8 after:bg-gray-200">
                            <Search className="text-gray-500" size={20} />
                            <input
                                type="text"
                                value={searchTitle}
                                onChange={(e) => setSearchTitle(e.target.value)}
                                placeholder="Job title or keyword"
                                className="w-full bg-transparent border-none focus:ring-0 outline-none text-gray-900 placeholder-gray-400 text-base"
                            />
                        </div>
                        <div className="flex-1 flex items-center gap-3 px-6 py-[10px] w-full md:w-auto relative">
                            <MapPin className="text-gray-500" size={20} />
                            <div
                                className="w-full flex items-center justify-between bg-transparent border-none focus:ring-0 outline-none cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('location-dropdown')?.classList.toggle('hidden');
                                }}
                            >
                                <span className="text-base text-gray-900 font-medium">
                                    {searchLocation || 'Florence, Italy'}
                                </span>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </div>
                            <div
                                id="location-dropdown"
                                className="hidden absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-xl border border-gray-100 z-50 py-2"
                            >
                                {LOCATIONS.map((loc) => (
                                    <div
                                        key={loc}
                                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 transition-colors"
                                        onClick={() => {
                                            setSearchLocation(loc);
                                            document.getElementById('location-dropdown')?.classList.add('hidden');
                                        }}
                                    >
                                        {loc}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full md:w-auto px-8 py-[10px] rounded bg-primary text-white font-medium hover:bg-primary-hover transition whitespace-nowrap text-base"
                        >
                            Search my job
                        </button>
                    </form>
                    <p className="mt-6 text-sm text-gray-400">
                        Popular: UI Designer, UX Researcher, Android, Admin
                    </p>
                </div>

                <div className="hidden lg:block flex-1 relative z-10 w-full max-w-[500px] xl:max-w-[550px] mx-auto lg:ml-auto lg:mr-0 mt-8">
                    <div className="relative w-full h-auto">
                        <Image
                            src="/images/banner.png"
                            alt="Job Seeker Banner"
                            width={500}
                            height={500}
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
