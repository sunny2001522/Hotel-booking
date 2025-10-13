
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-16">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Iceverse. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-2">探索奇蹟，體驗非凡</p>
      </div>
    </footer>
  );
};

export default Footer;
