import { Student } from '../types';
import { students } from '../data/students';

export const generateAIResponse = async (userInput: string): Promise<string> => {
  const normalizedInput = userInput.toLowerCase();
  
  // Student listing
  if (normalizedInput.includes('list all students') || 
      normalizedInput.includes('show students') || 
      normalizedInput.includes('view students')) {
    return formatStudentList(students);
  }
  
  // Adding new student
  if (normalizedInput.includes('add new student') || 
      normalizedInput.includes('create student')) {
    return `To add a new student, please provide the following information:
1. Full Name
2. Email Address
3. Enrollment Date
4. Courses (comma separated)

For example: "Add student: John Smith, john@example.com, 2023-09-01, Math 101, English 201"`;
  }
  
  // Search for student
  if (normalizedInput.includes('search for') || 
      normalizedInput.includes('find student')) {
    const searchTerms = normalizedInput.split(' ').filter(term => 
      term.length > 3 && 
      !['search', 'find', 'student', 'for', 'the', 'with', 'name'].includes(term)
    );
    
    if (searchTerms.length > 0) {
      const results = students.filter(student => 
        searchTerms.some(term => 
          student.name.toLowerCase().includes(term) || 
          student.email.toLowerCase().includes(term)
        )
      );
      
      if (results.length > 0) {
        return `I found ${results.length} student(s) matching your search:\n\n${formatStudentList(results)}`;
      } else {
        return "I couldn't find any students matching your search criteria. Please try with different keywords.";
      }
    } else {
      return "Please provide a name or email to search for a student. For example: 'search for student Emma' or 'find student with email john@example.com'";
    }
  }
  
  // Academic reports
  if (normalizedInput.includes('academic') && 
      (normalizedInput.includes('report') || normalizedInput.includes('performance'))) {
    return `Here's a summary of academic performance:

📊 **Academic Overview**
- Total Students: ${students.length}
- Average GPA: ${(students.reduce((sum, student) => sum + student.gpa, 0) / students.length).toFixed(2)}
- Students with GPA > 3.5: ${students.filter(s => s.gpa > 3.5).length}
- Students with GPA < 2.0: ${students.filter(s => s.gpa < 2.0).length}

Would you like to see a detailed breakdown by course or student?`;
  }
  
  // Handle course inquiries
  if (normalizedInput.includes('course') || normalizedInput.includes('class')) {
    const allCourses = Array.from(new Set(
      students.flatMap(student => student.courses.map(course => course.name))
    ));
    
    return `Here are the courses currently being offered:
${allCourses.map(course => `- ${course}`).join('\n')}

You can ask me about specific course details or enrollment information.`;
  }
  
  // Default responses for other queries
  const defaultResponses = [
    "I can help you manage student information, track academic progress, and generate reports. What would you like to do?",
    "As your student management assistant, I can help with enrollment, academic tracking, and student data. How can I assist you today?",
    "I'm here to help with your student management needs. You can ask me to list students, add new ones, or search for specific information.",
    "I don't have specific information about that. Would you like me to help you with student enrollment, academic reports, or searching for student records instead?"
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

const formatStudentList = (studentList: Student[]): string => {
  if (studentList.length === 0) {
    return "No students found.";
  }
  
  return `Here are the students (${studentList.length} total):\n\n${
    studentList.map((student, index) => 
      `${index + 1}. **${student.name}** (${student.email})
   - Status: ${student.status}
   - GPA: ${student.gpa.toFixed(1)}
   - Courses: ${student.courses.map(c => c.name).join(', ')}`
    ).join('\n\n')
  }`;
};