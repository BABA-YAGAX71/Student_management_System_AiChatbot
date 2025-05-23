import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Student, Course } from '../types';
import { students as initialStudents } from '../data/students';
import { v4 as uuidv4 } from 'uuid';

interface StudentContextType {
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  getStudent: (id: string) => Student | undefined;
  addCourseToStudent: (studentId: string, course: Omit<Course, 'id'>) => void;
  removeCourseFromStudent: (studentId: string, courseId: string) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent = { ...student, id: uuidv4() };
    setStudents((prev) => [...prev, newStudent as Student]);
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, ...updates } : student
      )
    );
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const getStudent = (id: string) => {
    return students.find((student) => student.id === id);
  };

  const addCourseToStudent = (studentId: string, course: Omit<Course, 'id'>) => {
    const newCourse = { ...course, id: uuidv4() };
    
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? { ...student, courses: [...student.courses, newCourse as Course] }
          : student
      )
    );
  };

  const removeCourseFromStudent = (studentId: string, courseId: string) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              courses: student.courses.filter((course) => course.id !== courseId),
            }
          : student
      )
    );
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        getStudent,
        addCourseToStudent,
        removeCourseFromStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }
  return context;
};