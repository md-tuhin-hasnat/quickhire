const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');

// Load env vars
dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quickhire');

const jobs = [
    {
        title: 'Senior Brand Designer',
        company: 'Dropbox',
        location: 'San Francisco, USA',
        category: 'Design',
        type: 'Full Time',
        description: '<p>We are looking for a highly skilled Brand Designer to join our team at Dropbox. You will be responsible for creating visual concepts to communicate ideas that inspire, inform, and captivate our target audience.</p><br/><h3 class="text-xl font-semibold mb-2">Requirements:</h3><ul class="list-disc pl-5 mb-4 space-y-2"><li>3+ years of experience in brand or visual design.</li><li>Strong portfolio showcasing branding, typography, and illustration skills.</li></ul>',
    },
    {
        title: 'Email Marketing Specialist',
        company: 'Revolut',
        location: 'Madrid, Spain',
        category: 'Marketing',
        type: 'Full Time',
        description: '<p>Revolut is looking for an Email Marketing Specialist to help our team grow and communicate effectively with our global user base.</p>',
    },
    {
        title: 'Frontend Developer (Next.js)',
        company: 'Vercel',
        location: 'Remote',
        category: 'Engineering',
        type: 'Full Time',
        description: '<p>Join the team building the web. Experience with React, Next.js, and Tailwind CSS is highly desired.</p>',
    },
    {
        title: 'Social Media Assistant',
        company: 'Nomad',
        location: 'Paris, France',
        category: 'Marketing',
        type: 'Part Time',
        description: '<p>Help us manage our daily social media interactions across Twitter, Instagram, and LinkedIn.</p>',
    },
    {
        title: 'Interactive Developer',
        company: 'Terraform',
        location: 'Hamburg, Germany',
        category: 'Engineering',
        type: 'Full Time',
        description: '<p>Seeking an interactive developer with strong 3D web experience (Three.js/WebGL).</p>',
    },
    {
        title: 'HR Manager',
        company: 'Packer',
        location: 'Lucerne, Switzerland',
        category: 'Human Resource',
        type: 'Full Time',
        description: '<p>We need an experienced HR Manager to oversee our growing European team.</p>',
    },
    {
        title: 'Visual Designer',
        company: 'Blinkist',
        location: 'Granada, Spain',
        category: 'Design',
        type: 'Contract',
        description: '<p>Help us design beautiful marketing assets for Blinkist app stores and ad campaigns.</p>',
    },
];

const seedDB = async () => {
    try {
        console.log('Clearing existing jobs...');
        await Job.deleteMany();

        console.log('Inserting seed data...');
        await Job.insertMany(jobs);

        console.log('✅ Database successfully seeded!');
        process.exit();
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDB();
