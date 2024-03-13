import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  StudentModel,
  TGardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods,
  TUserName,
} from './student/student.interface';
import config from '..';

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});
const guardianSchema = new Schema<TGardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, 'Id is Required'], unique: true },
  name: {
    type: userNameSchema,
    required: [true, 'User name is Missing']
  },
  password: { type: String, maxlength: [20, "password can not be more then 20"] },
  gender: {
    type: String,
    enum: ['female', 'male', 'other'],
    required: [true, "missing a gender"]
  },
  dateOfBirth: {
    type: String,
    required: [true, 'date of birth missing']
  },
  contactNo: { type: String, required: true },
  emergencycontactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: [true, "Missing a blood group"]
  },
  presetAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: [true, "Missing guardian"]
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "missing local Guardian"]
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: "active"
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(user.password, Number(config.saltRounds))
  next()

})
studentSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// creating a custom static method in mongoose 
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}


// create a instance methond in mongoose 

// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id })
//   return existingUser
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
