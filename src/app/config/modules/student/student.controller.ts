import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.zod.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;
    const parseZodData = studentValidationSchema.parse(student)

    const result = await StudentServices.createStudentIntoDB(parseZodData);
    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: false,
      message: error.message || 'Student is is not inserted',
      data: error,
    });
  }
};
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'Students is retrieved succesfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Student is retrieved unsuccesfully',
      data: error,
    });
  }
};
const deleteSignleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params
    const result = await StudentServices.deleteSingleStudentFromDB(studentId)
    res.status(400).json({
      success: false,
      message: 'Student is retrieved unsuccesfully',
      data: result,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Delete is not succesfull"
    })
  }
}
export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteSignleStudent
};
