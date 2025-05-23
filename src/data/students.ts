import { Student, Course } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Helper function to create courses
const createCourse = (name: string, code: string, credits: number, grade?: string): Course => ({
  id: uuidv4(),
  name,
  code,
  credits,
  grade
});

// Sample course catalog
const courseCatalog: Course[] = [
  createCourse('Introduction to Computer Science', 'CS101', 3),
  createCourse('Calculus I', 'MATH101', 4),
  createCourse('English Composition', 'ENG101', 3),
  createCourse('Introduction to Psychology', 'PSYCH101', 3),
  createCourse('World History', 'HIST101', 3),
  createCourse('Biology', 'BIO101', 4),
  createCourse('Chemistry', 'CHEM101', 4),
  createCourse('Physics', 'PHYS101', 4),
  createCourse('Data Structures', 'CS201', 3),
  createCourse('Linear Algebra', 'MATH201', 3),
];

// Generate random courses for a student
const getRandomCourses = (count: number): Course[] => {
  const shuffled = [...courseCatalog].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(course => ({
    ...course,
    grade: ['A', 'B+', 'B', 'C+', 'C', 'D', 'F'][Math.floor(Math.random() * 7)]
  }));
};

// Sample student data
export const students: Student[] = [
  {
    id: uuidv4(),
    name: 'Emma Johnson',
    email: 'emma.johnson@university.edu',
    enrollmentDate: '2022-09-01',
    courses: getRandomCourses(4),
    gpa: 3.8,
    profileImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'active',
  },
  {
    id: uuidv4(),
    name: 'Michael Chen',
    email: 'michael.chen@university.edu',
    enrollmentDate: '2021-09-01',
    courses: getRandomCourses(5),
    gpa: 3.5,
    profileImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'active',
  },
  {
    id: uuidv4(),
    name: 'Sophia Rodriguez',
    email: 'sophia.rodriguez@university.edu',
    enrollmentDate: '2022-01-15',
    courses: getRandomCourses(3),
    gpa: 4.0,
    profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'active',
  },
  {
    id: uuidv4(),
    name: 'James Wilson',
    email: 'james.wilson@university.edu',
    enrollmentDate: '2021-01-15',
    courses: getRandomCourses(4),
    gpa: 2.7,
    profileImage: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'on-leave',
  },
  {
    id: uuidv4(),
    name: 'Olivia Kim',
    email: 'olivia.kim@university.edu',
    enrollmentDate: '2020-09-01',
    courses: getRandomCourses(5),
    gpa: 3.9,
    profileImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'active',
  },
  {
    id: uuidv4(),
    name: 'Ethan Brown',
    email: 'ethan.brown@university.edu',
    enrollmentDate: '2022-09-01',
    courses: getRandomCourses(3),
    gpa: 3.2,
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'active',
  },
  {
    id: uuidv4(),
    name: 'Ava Martinez',
    email: 'ava.martinez@university.edu',
    enrollmentDate: '2020-01-15',
    courses: getRandomCourses(5),
    gpa: 3.7,
    profileImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'graduated',
  },
  {
    id: uuidv4(),
    name: 'Noah Thompson',
    email: 'noah.thompson@university.edu',
    enrollmentDate: '2021-09-01',
    courses: getRandomCourses(4),
    gpa: 2.9,
    profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    status: 'inactive',
  },
];