import React from 'react';
import { Link } from 'react-router-dom';
import { Home,BookOpen,BellRing,Bookmark,Settings } from 'lucide-react'; 

export default function Sidebar() {
  return (
    <div className="flex flex-col items-center py-8">
      <Link to="/" className="p-3 hover:bg-gray-200 rounded-xl transition-colors">
        <Home size={24} />
      </Link>
      <button className="p-2 hover:bg-gray-200 rounded-xl transition-colors text-gray-500 hover:text-gray-900">
          <BookOpen size={24} />
        </button>
        <button className="p-2 hover:bg-gray-200 rounded-xl transition-colors text-gray-500 hover:text-gray-900">
          <BellRing size={24} />
        </button>
          <button className="p-2 hover:bg-gray-200 rounded-xl transition-colors text-gray-500 hover:text-gray-900">
          <Bookmark size={24} />
        </button>
          <button className="p-2 hover:bg-gray-200 rounded-xl transition-colors text-gray-500 hover:text-gray-900">
          <Settings size={24} />
        </button>
    </div>
  );
}