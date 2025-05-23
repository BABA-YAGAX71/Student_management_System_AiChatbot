export interface Student {
  id: string;
  name: string;
  email: string;
  enrollmentDate: string;
  courses: Course[];
  gpa: number;
  profileImage?: string;
  status: 'active' | 'inactive' | 'graduated' | 'on-leave';
}

export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  grade?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  attachments?: string[];
}