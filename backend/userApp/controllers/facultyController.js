
const mongoose = require('../../shared/db').mongoose;
const Faculty = require('../models/facultyModel');
const Department = require('../models/departmentModel');

const ObjectId = mongoose.Types.ObjectId;
const { Types } = mongoose;


exports.getFaculties = async (req, res) => {
    try {
        const departments = await Department.find().populate('faculty').lean();

        const facultyDepartments = {};
        console.log(departments)

        departments?.forEach(dept => {
            const facultyName = dept.faculty.name;
            if (!facultyDepartments[facultyName]) {
                facultyDepartments[facultyName] = [];
            }
            facultyDepartments[facultyName].push(dept.name);
        });

        res.status(200).json({message:"success", data:facultyDepartments});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
