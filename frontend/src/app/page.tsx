'use client';

import { useState, useEffect } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import PartnersSection from '@/components/sections/PartnersSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import PromoBanner from '@/components/sections/PromoBanner';
import FeaturedJobs from '@/components/sections/FeaturedJobs';
import LatestJobs from '@/components/sections/LatestJobs';

export default function Home() {
  const [featuredJobs, setFeaturedJobs] = useState<any[]>([]);
  const [latestJobs, setLatestJobs] = useState<any[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/jobs`);
        const data = await res.json();
        if (data.success) {
          const jobs = data.data;
          setFeaturedJobs(jobs.slice(0, 4));
          setLatestJobs(jobs.slice(0, 8));

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
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <PartnersSection />
      <CategoriesSection categoryCounts={categoryCounts} />
      <PromoBanner />
      <FeaturedJobs jobs={featuredJobs} loading={loading} />
      <LatestJobs jobs={latestJobs} loading={loading} />
    </div>
  );
}
