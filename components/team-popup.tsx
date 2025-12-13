"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const teamMembers = [
  {
    role: "Founder",
    name: "Alex Rivera",
    image: "/man.svg",
    description: "Visionary leader with a passion for education technology.",
    color: "bg-blue-100 text-blue-700"
  },
  {
    role: "Co-Founder",
    name: "Sarah Chen",
    image: "/woman.svg",
    description: "Tech innovator driving our product architecture.",
    color: "bg-purple-100 text-purple-700"
  },
  {
    role: "Lead Developer",
    name: "Mike Johnson",
    image: "/boy.svg",
    description: "Crafting beautiful and responsive user experiences.",
    color: "bg-green-100 text-green-700"
  },
  {
    role: "Designer",
    name: "Emily Davis",
    image: "/girl.svg",
    description: "Bringing creative ideas to life through design.",
    color: "bg-pink-100 text-pink-700"
  }
];

export const TeamPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Show popup after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] border-none bg-transparent shadow-none p-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-white rounded-3xl overflow-hidden shadow-2xl relative"
        >
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          
          <div className="pt-12 pb-8 px-8 relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Meet Our Team</h2>
              <p className="text-gray-500">The minds behind Softcode</p>
            </div>

            <div className="relative h-[300px] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <div className={`p-1 rounded-full mb-4 ${teamMembers[currentIndex].color.split(' ')[0]}`}>
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <Image 
                        src={teamMembers[currentIndex].image} 
                        alt={teamMembers[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <span className={`px-4 py-1 rounded-full text-sm font-semibold mb-3 ${teamMembers[currentIndex].color}`}>
                    {teamMembers[currentIndex].role}
                  </span>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {teamMembers[currentIndex].name}
                  </h3>
                  
                  <p className="text-center text-gray-600 max-w-xs">
                    {teamMembers[currentIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-2 mt-4">
              {teamMembers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "w-6 bg-indigo-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
