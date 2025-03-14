
const mongoose = require('../../shared/db').mongoose;
const Faculty = require('../models/facultyModel');
const FacultyGroup = require('../models/facultyGroupModel');
const Department = require('../models/departmentModel');

const ObjectId = mongoose.Types.ObjectId;
const { Types } = mongoose;

exports.getFaculties = async (req, res) => {
    try {
        /*
        const departments = await Department.find().populate('faculty').lean();

        const facultyDepartments = {};
        //console.log(departments)

        departments?.forEach(dept => {
            const facultyName = dept.faculty.name;
            if (!facultyDepartments[facultyName]) {
                facultyDepartments[facultyName] = {_id:dept.faculty._id, departments:[]};
            }
            facultyDepartments[facultyName].departments.push({_id:dept._id, name:dept.name});
        });
        //console.log(facultyDepartments)
            */
        const faculties = await Faculty.find()

        res.status(200).json({message:"success", data:faculties});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.getFacultyGroup = async (req, res) => {
    try {
      
        const facultyGroups = await FacultyGroup.find().populate('faculties')

        res.status(200).json({message:"success", data:facultyGroups});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}


exports.getDepartmentsFaculties = async (req, res) => {
    try {
        const departments = await Department.find().populate('faculty').lean();

        const facultyDepartments = {};
        //console.log(departments)

        departments?.forEach(dept => {
            const facultyName = dept.faculty.name;
            if (!facultyDepartments[facultyName]) {
                facultyDepartments[facultyName] = {_id:dept.faculty._id, departments:[]};
            }
            facultyDepartments[facultyName].departments.push({_id:dept._id, name:dept.name});
        });
        //console.log(facultyDepartments)

        res.status(200).json({message:"success", data:facultyDepartments});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
