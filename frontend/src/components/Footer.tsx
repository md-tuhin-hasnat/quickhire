import Link from 'next/link';
import { Briefcase, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white mt-auto pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center">
                                <Briefcase size={20} strokeWidth={2.5} />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">QuickHire</span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed max-w-sm">
                            Great platform for the job seeker that is searching for new career heights and passionate about startups.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-6">About</h4>
                        <ul className="space-y-4">
                            <li><Link href="/companies" className="text-gray-400 hover:text-white transition-colors">Companies</Link></li>
                            <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link></li>
                            <li><Link href="/advice" className="text-gray-400 hover:text-white transition-colors">Advice</Link></li>
                            <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-6">Resources</h4>
                        <ul className="space-y-4">
                            <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Docs</Link></li>
                            <li><Link href="/guide" className="text-gray-400 hover:text-white transition-colors">Guide</Link></li>
                            <li><Link href="/updates" className="text-gray-400 hover:text-white transition-colors">Updates</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-6">Get job notifications</h4>
                        <p className="text-gray-400 mb-4">The latest job news, articles, sent to your inbox weekly.</p>
                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button className="w-full px-4 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition shadow-sm">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © 2024 QuickHire. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"><Facebook size={18} /></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"><Instagram size={18} /></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"><Twitter size={18} /></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all"><Linkedin size={18} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
