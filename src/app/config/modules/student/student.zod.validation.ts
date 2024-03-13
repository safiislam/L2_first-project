import { z } from 'zod';

// Define Zod schema for user name
const userNameSchema = z.object({
    firstName: z.string().nonempty(),
    middleName: z.string().optional(),// Make middleName optional and nullable
    lastName: z.string().nonempty(),
});

// Define Zod schema for guardian
const guardianSchema = z.object({
    fatherName: z.string().nonempty(),
    fatherOccupation: z.string().nonempty(),
    fatherContactNo: z.string().nonempty(),
    motherName: z.string().nonempty(),
    motherOccupation: z.string().nonempty(),
    motherContactNo: z.string().nonempty(),
});

// Define Zod schema for local guardian
const localGuardianSchema = z.object({
    name: z.string().nonempty(),
    occupation: z.string().nonempty(),
    contactNo: z.string().nonempty(),
    address: z.string().nonempty(),
});

// Define Zod schema for student
const studentValidationSchema = z.object({
    id: z.string().nonempty(),
    name: userNameSchema,
    dateOfBirth: z.string().nonempty(),
    password: z.string().max(20),
    gender: z.enum(['female', 'male', 'other']),
    contactNo: z.string().nonempty(),
    emergencycontactNo: z.string().nonempty(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presetAddress: z.string().nonempty(),
    permanentAddress: z.string().nonempty(),
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: z.string().optional(),
    isActive: z.enum(['active', 'blocked']).default("active"),
    isDeleted: z.boolean().default(false),
});

// export { studentValidationSchema as studentSchema };
export default studentValidationSchema
