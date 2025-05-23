import React from 'react';
import { Bookmark, GraduationCap, Home, Settings, Users } from 'lucide-react';
import { useStudentContext } from '../context/StudentContext';

export const Sidebar: React.FC = () => {
  const { students } = useStudentContext();
  
  return (
    <div className="bg-indigo-800 text-white w-64 flex flex-col h-full transition-all duration-300 ease-in-out">
      <div className="p-5 border-b border-indigo-700">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8" />
          <h1 className="text-xl font-semibold">EduAssist AI</h1>
        </div>
      </div>
      
      <nav className="flex-1 px-3 py-4">
        <div className="space-y-1">
          <SidebarLink icon={<Home />} label="Dashboard" active />
          <SidebarLink icon={<Users />} label="Students" badge={students.length} />
          <SidebarLink icon={<Bookmark />} label="Courses" />
          <SidebarLink icon={<Settings />} label="Settings" />
        </div>
      </nav>
      
      <div className="p-4 border-t border-indigo-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="font-medium">AD</span>
          </div>
          <div>
            <p className="font-medium">Admin User</p>
            <p className="text-xs text-indigo-300">admin@eduassist.ai</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  badge?: number;
  active?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, label, badge, active }) => {
  return (
    <a 
      href="#" 
      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md group transition-all duration-200 ${
        active 
          ? 'bg-indigo-900 text-white' 
          : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
      }`}
    >
      <span className="mr-3 h-5 w-5">{icon}</span>
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="inline-flex items-center justify-center h-5 w-5 text-xs bg-indigo-600 text-white rounded-full">
          {badge}
        </span>
      )}
    </a>
  );
};