import { Course, Assignment } from "../models/course.model.js";
import { User } from "../models/user.model.js";

// Add a course
export const addCourse = async (req, res) => {
    const { title, instructor, schedule } = req.body;
    try {
        const course = await Course.create({ title, instructor, schedule });
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add an assignment to a course
export const addAssignment = async (req, res) => {
    const { title, dueDate, courseId, description } = req.body;
    try {
        const assignment = await Assignment.create({ title, dueDate, course: courseId, description });
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        course.assignments.push(assignment._id);
        await course.save();
        res.status(201).json(assignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get user's timetable
export const getTimetable = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate({
            path: 'courses',
            populate: { path: 'assignments' }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const timetable = await user.getTimetable();
        res.status(200).json(timetable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
