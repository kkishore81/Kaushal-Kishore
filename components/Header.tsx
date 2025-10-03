
import React from 'react';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-base-200/80 backdrop-blur-sm shadow-md w-full z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white">
              {title}
            </h1>
          </div>
          {/* Future elements like user profile can go here */}
        </div>
      </div>
    </header>
  );
};

export default Header;