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
        description: '<p>Revolut is looking for an Email Marketing Specialist to help our team grow and communicate effectively with our global user base.</p><br/><h3 class="text-xl font-semibold mb-2">What you will do:</h3><ul class="list-disc pl-5 mb-4 space-y-2"><li>Design and execute end-to-end email marketing campaigns to drive user acquisition and retention.</li><li>Analyze campaign performance metrics and A/B test strategies to optimize open rates and conversions.</li><li>Collaborate with the design and copywriting teams to create compelling email content.</li><li>Manage and segment subscriber lists to ensure targeted messaging.</li></ul><br/><h3 class="text-xl font-semibold mb-2">Requirements:</h3><ul class="list-disc pl-5 mb-4 space-y-2"><li>2+ years of experience in email marketing or CRM.</li><li>Proficiency in HTML/CSS for email design.</li><li>Experience with tools like Braze, Mailchimp, or HubSpot.</li><li>Strong analytical and problem-solving skills.</li></ul>',
    },
    {
        title: 'Frontend Developer (Next.js)',
        company: 'Vercel',
        location: 'Remote',
        category: 'Engineering',
        type: 'Full Time',
        description: '<p>Join the team building the web. Experience with React, Next.js, and Tailwind CSS is highly desired. You will be at the forefront of frontend innovation.</p><br/><h3 class="text-xl font-semibold mb-2">What you will do:</h3><ul class="list-disc pl-5 mb-4 space-y-2"><li>Build and maintain high-performance, accessible, and responsive user interfaces.</li><li>Collaborate with cross-functional teams to define, design, and ship new features.</li><li>Write clean, scalable, and well-tested code using TypeScript and React.</li><li>Optimize applications for maximum speed and scalability.</li></ul><br/><h3 class="text-xl font-semibold mb-2">Requirements:</h3><ul class="list-disc pl-5 mb-4 space-y-2"><li>3+ years of professional experience in frontend development.</li><li>Deep expertise in React.js and the Next.js framework.</li><li>Strong understanding of web vitals and performance optimization techniques.</li><li>Excellent communication skills and the ability to work independently in a remote environment.</li></ul>',
    },
    {
        title: 'Social Media Assistant',
        company: 'Nomad',
        location: 'Paris, France',
        category: 'Marketing',
        type: 'Part Time',
        description: '<p>Help us manage our daily social media interactions across Twitter, Instagram, and LinkedIn. You will be the voice of our brand online.</p><br/><h3 class="text-xl font-semibold mb-2">What you will do:</h3><ul class="list-disc pl-5 mb-4 space-y-2"><li>Create, schedule, and publish engaging content across all social media platforms.</li><li>Monitor social media channels and engage with our community.</li><li>Track and report on social media performance metrics.</li><li>Assist in the development of social media campaigns and strategies.</li></ul><br/><h3 class="text-xl font-semibold mb-2">Requirements:</h3><ul class="list-disc pl-5 mb-4 space-y-2"><li>1-2 years of experience in social media management or community growth.</li><li>Excellent written and verbal communication skills in French and English.</li><li>Creativity and a keen eye for visual design and trends.</li><li>Familiarity with social media analytics tools.</li></ul>',
    },
    {
        title: 'Interactive Developer',
        company: 'Terraform',
        location: 'Hamburg, Germany',
        category: 'Engineering',
        type: 'Full Time',
        description: '<p>Seeking an interactive developer with strong 3D web experience (Three.js/WebGL) to create immersive digital experiences.</p><br/><h3 class="text-xl font-semibold mb-2">What you will do:</h3><ul class="list-disc pl-5 mb-4 space-y-2"><li>Develop interactive 3D web applications using modern WebGL frameworks.</li><li>Work closely with technical artists to optimize 3D assets for the web.</li><li>Implement complex animations and transitions to enhance user engagement.</li><li>Ensure cross-browser compatibility and performance optimization.</li></ul><br/><h3 class="text-xl font-semibold mb-2">Requirements:</h3><ul class="list-disc pl-5 mb-4 space-y-2"><li>Proven experience with Three.js, React Three Fiber, and WebGL APIs.</li><li>Strong proficiency in JavaScript/TypeScript and modern web development.</li><li>Understanding of shaders (GLSL) is a major plus.</li><li>A portfolio demonstrating creative coding and interactive projects.</li></ul>',
    },
    {
        title: 'HR Manager',
        company: 'Packer',
        location: 'Lucerne, Switzerland',
        category: 'Human Resource',
        type: 'Full Time',
        description: '<p>We need an experienced HR Manager to oversee our growing European team. You will play a crucial role in building our company culture and supporting our employees.</p><br/><h3 class="text-xl font-semibold mb-2">What you will do:</h3><ul class="list-disc pl-5 mb-4 space-y-2"><li>Manage the full recruitment lifecycle, from sourcing to onboarding.</li><li>Develop and implement HR policies and procedures aligned with local regulations.</li><li>Foster a positive and inclusive workplace culture across diverse teams.</li><li>Handle employee relations, performance management, and benefits administration.</li></ul><br/><h3 class="text-xl font-semibold mb-2">Requirements:</h3><ul class="list-disc pl-5 mb-4 space-y-2"><li>5+ years of experience in Human Resources management, preferably in a tech or international environment.</li><li>Deep knowledge of Swiss and European labor laws.</li><li>Strong interpersonal, negotiation, and conflict resolution skills.</li><li>Fluency in English and German.</li></ul>',
    },
    {
        title: 'Visual Designer',
        company: 'Blinkist',
        location: 'Granada, Spain',
        category: 'Design',
        type: 'Contract',
        description: '<p>Help us design beautiful marketing assets for Blinkist app stores and ad campaigns. You will have a direct impact on our brand visibility and user acquisition.</p><br/><h3 class="text-xl font-semibold mb-2">What you will do:</h3><ul class="list-disc pl-5 mb-4 space-y-2"><li>Design highly engaging visuals for digital marketing campaigns, including social ads, banners, and app store screenshots.</li><li>Ensure brand consistency across all marketing touchpoints.</li><li>Collaborate with the performance marketing team to conceptualize and test new creative assets.</li><li>Stay up-to-date with design trends and industry best practices.</li></ul><br/><h3 class="text-xl font-semibold mb-2">Requirements:</h3><ul class="list-disc pl-5 mb-4 space-y-2"><li>2+ years of experience in visual or graphic design, with a focus on digital marketing.</li><li>A strong portfolio highlighting advertising creatives and digital assets.</li><li>Proficiency in Adobe Creative Suite (Photoshop, Illustrator) and Figma.</li><li>A keen understanding of layout, typography, and color theory.</li></ul>',
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
