const Job = require('../models/Job');
const { z } = require('zod');

// Validation schema for creating a job
const createJobSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    company: z.string().min(1, 'Company is required'),
    location: z.string().min(1, 'Location is required'),
    category: z.string().min(1, 'Category is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    type: z.string().optional(),
});

// @desc    Get all jobs
// @route   GET /api/jobs
exports.getJobs = async (req, res, next) => {
    try {
        const { search, category, location } = req.query;

        let query = {};
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }
        if (category) {
            query.category = { $regex: category, $options: 'i' };
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        const jobs = await Job.find(query).sort({ created_at: -1 });

        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
exports.getJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        res.status(200).json({
            success: true,
            data: job
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Create new job
// @route   POST /api/jobs
exports.createJob = async (req, res, next) => {
    try {
        // Validate request body
        const validatedData = createJobSchema.parse(req.body);

        const job = await Job.create(validatedData);

        res.status(201).json({
            success: true,
            data: job
        });
    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ success: false, errors: err.errors });
        }
        next(err);
    }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
exports.deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);

        if (!job) {
            return res.status(404).json({ success: false, message: 'Job not found' });
        }

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};
