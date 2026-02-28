const Application = require('../models/Application');
const Job = require('../models/Job');
const { z } = require('zod');

// Validation schema for creating an application
const createApplicationSchema = z.object({
    job_id: z.string().min(1, 'Job ID is required'),
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    resume_link: z.string().url('Resume link must be a valid URL'),
    cover_note: z.string().optional(),
});

// @desc    Apply for a job
// @route   POST /api/applications
exports.createApplication = async (req, res, next) => {
    try {
        // Validate request body
        const validatedData = createApplicationSchema.parse(req.body);

        // Ensure the job exists
        const jobExists = await Job.findById(validatedData.job_id);
        if (!jobExists) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        const application = await Application.create(validatedData);

        res.status(201).json({
            success: true,
            data: application
        });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ success: false, errors: err.errors });
        }
        next(err);
    }
};
