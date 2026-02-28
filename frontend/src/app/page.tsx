'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ArrowRight, PenTool, Database, Briefcase, FileCode, Landmark, DollarSign, Calculator, Users } from 'lucide-react';
import JobCard from '@/components/JobCard';

export default function Home() {
  const router = useRouter();
  const [searchTitle, setSearchTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [featuredJobs, setFeaturedJobs] = useState<any[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [loadingTopSection, setLoadingTopSection] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/jobs');
        const data = await res.json();
        if (data.success) {
          const jobs = data.data;
          setFeaturedJobs(jobs.slice(0, 4));

          // Calculate category counts
          const counts: Record<string, number> = {};
          jobs.forEach((job: any) => {
            if (job.category) {
              const catName = job.category.toLowerCase();
              counts[catName] = (counts[catName] || 0) + 1;
            }
          });
          setCategoryCounts(counts);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoadingTopSection(false);
      }
    };
    fetchHomeData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let url = '/jobs?';
    if (searchTitle) url += `search=${encodeURIComponent(searchTitle)}&`;
    if (searchLocation) url += `location=${encodeURIComponent(searchLocation)}&`;
    router.push(url);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 border-b border-gray-100 bg-white overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary-light/50 blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-blue-100 blur-3xl opacity-50 pointer-events-none"></div>

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
            <form onSubmit={handleSearch} className="bg-white p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full md:w-auto border-b md:border-b-0 md:border-r border-gray-100">
                <Search className="text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  placeholder="Job title or keyword"
                  className="w-full bg-transparent border-none focus:ring-0 outline-none text-gray-900 placeholder-gray-400"
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full md:w-auto">
                <MapPin className="text-gray-400" size={20} />
                <select
                  className="w-full bg-transparent border-none focus:ring-0 outline-none text-gray-900 cursor-pointer appearance-none"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                >
                  <option value="">Any Location</option>
                  <option value="Florence, Italy">Florence, Italy</option>
                  <option value="New York, USA">New York, USA</option>
                  <option value="London, UK">London, UK</option>
                  <option value="San Francisco, USA">San Francisco, USA</option>
                </select>
              </div>
              <button type="submit" className="w-full md:w-auto px-8 py-4 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover transition shadow-sm whitespace-nowrap">
                Search my job
              </button>
            </form>
            <p className="mt-6 text-sm text-gray-400">
              Popular: UI Designer, UX Researcher, Android, Admin
            </p>
          </div>

          <div className="hidden lg:block flex-1 relative">
            <div className="relative w-full aspect-square max-w-[500px] mx-auto rounded-full bg-slate-50 overflow-hidden">
              {/* Minimal abstract representation instead of actual image/avatar since we don't have the explicit PNG file */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full h-full bg-primary-light/30 rounded-full flex items-center justify-center relative shadow-inner">
                  <div className="w-3/4 h-3/4 bg-primary-light/60 rounded-full flex items-center justify-center relative">
                    <div className="w-1/2 h-1/2 bg-primary rounded-full animate-pulse opacity-80 shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-10 border-b border-gray-100 bg-white">
        <div className="container">
          <p className="text-sm text-gray-400 mb-6 font-medium">Companies we helped grow</p>
          <div className="flex flex-wrap items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using text logos to mock partner SVGs */}
            <span className="text-2xl font-bold font-serif tracking-tighter">vodafone</span>
            <span className="text-3xl font-black tracking-widest text-[#0071C5]">intel</span>
            <span className="text-2xl font-black tracking-[0.2em] text-[#E82127]">TESLA</span>
            <span className="text-3xl font-black text-green-700">AMD</span>
            <span className="text-2xl font-semibold opacity-70">Talkit</span>
          </div>
        </div>
      </section>

      {/* Explore by Category */}
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
            {[
              { icon: PenTool, name: 'Design', active: false },
              { icon: Database, name: 'Sales', active: false },
              { icon: Briefcase, name: 'Marketing', active: true },
              { icon: DollarSign, name: 'Finance', active: false },
              { icon: FileCode, name: 'Technology', active: false },
              { icon: Calculator, name: 'Engineering', active: false },
              { icon: Briefcase, name: 'Business', active: false },
              { icon: Users, name: 'Human Resource', active: false },
            ].map((cat, idx) => {
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
              )
            })}
          </div>
          <Link href="/categories" className="mt-8 flex md:hidden items-center justify-center gap-2 text-primary font-medium">
            View all categories <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-10">
        <div className="container">
          <div className="bg-primary rounded-3xl overflow-hidden shadow-2xl relative flex flex-col lg:flex-row items-center">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

            <div className="p-12 lg:p-20 relative z-10 flex-1 text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Start posting <br className="hidden lg:block" /> jobs today
              </h2>
              <p className="text-white/80 mb-8 text-lg font-medium">Start posting jobs for only $10.</p>
              <Link href="/admin" className="inline-block px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-50 transition shadow-lg transform hover:-translate-y-1">
                Sign Up for Free
              </Link>
            </div>

            <div className="flex-1 w-full relative z-10 pt-10 px-10 lg:pt-20 lg:pr-12 flex justify-end">
              <div className="w-full max-w-lg bg-white rounded-t-xl rounded-b-none p-4 shadow-2xl -mb-2 border border-gray-200">
                <div className="flex items-center gap-2 mb-4 border-b pb-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/3 space-y-2">
                    <div className="h-2 w-full bg-gray-100 rounded"></div>
                    <div className="h-2 w-5/6 bg-gray-100 rounded"></div>
                    <div className="h-2 w-4/6 bg-gray-100 rounded"></div>
                  </div>
                  <div className="w-2/3 space-y-3">
                    <div className="flex justify-between items-end gap-2 h-20 border-b pb-2">
                      {[40, 70, 45, 90, 30].map((h, i) => (
                        <div key={i} className="w-8 bg-blue-100 rounded-t" style={{ height: `${h}%` }}>
                          {h === 90 && <div className="w-full h-full bg-primary rounded-t"></div>}
                        </div>
                      ))}
                    </div>
                    <div className="h-8 w-full bg-slate-800 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
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
          {loadingTopSection ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredJobs.map(job => (
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

      {/* Latest Jobs Open */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1">
              <JobCard
                id="5"
                title="Social Media Assistant"
                company="Nomad"
                location="Paris, France"
                type="Full Time"
                description="Nomad is looking for a Social Media Assistant."
                tags={['Marketing', 'Design']}
                logoBg="bg-emerald-500 text-white"
              />
            </div>
            <div className="col-span-1">
              <JobCard
                id="6"
                title="Brand Designer"
                company="Maze"
                location="San Francisco, USA"
                type="Full Time"
                description="Maze is looking for a Brand Designer."
                tags={['Design', 'Business']}
                logoBg="bg-indigo-600 text-white"
              />
            </div>
            <div className="col-span-1">
              <JobCard
                id="7"
                title="Interactive Developer"
                company="Terraform"
                location="Hamburg, Germany"
                type="Full Time"
                description="Terraform is looking for Interactive Developer."
                tags={['Engineering', 'Design']}
                logoBg="bg-cyan-500 text-white"
              />
            </div>
            <div className="col-span-1">
              <JobCard
                id="8"
                title="HR Manager"
                company="Packer"
                location="Lucerne, Switzerland"
                type="Full Time"
                description="Packer is looking for an HR Manager."
                tags={['Marketing', 'Management']}
                logoBg="bg-red-500 text-white"
              />
            </div>
          </div>
          <div className="mt-12 text-center">
            <Link href="/jobs" className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-white hover:border-gray-300 transition shadow-sm bg-gray-50">
              View All Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
