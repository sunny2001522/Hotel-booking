import { Phone, MailsIcon, Locate } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className=" backdrop-blur-lg text-steel-blue py-8 bg-primary text-white font-serif">
      <div className="container mx-auto text-center flex flex-col items-center ">
        <div className="md:flex gap-4 pb-6">
          <div className="flex items-center space-x-2 mb-2 ">
            <Phone />
            <a
              href="tel:0978649787"
              className="text-sm hover:text-gray-400 transition-colors"
            >
              0978649787
            </a>
          </div>
          <div className="flex items-center space-x-2 mb-2 ">
            <MailsIcon />
            <a
              href="mailto:yishiuan522@gmail.com"
              className="text-sm hover:text-gray-400 transition-colors"
            >
              yishiuan522@gmail.com
            </a>
          </div>
          <div className="flex items-center space-x-2 mb-2 ">
            <Locate />
            <a
              href="https://www.google.com/maps?q=台北市sonia路2001號"
              className="text-sm hover:text-gray-400 transition-colors"
            >
              台北市 sonia路 2001號
            </a>
          </div>
        </div>
        <p>&copy; {new Date().getFullYear()} Iceverse. All rights reserved.</p>
        <p className="text-sm text-gray-400 mt-2">探索奇蹟，體驗非凡</p>
      </div>
    </footer>
  );
};

export default Footer;
