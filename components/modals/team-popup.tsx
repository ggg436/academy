"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Facebook, Github, Instagram, Linkedin, X } from "lucide-react";
import Link from "next/link";

const teamMembers = [
  {
    name: "Team Member 1",
    role: "Full Stack Developer",
    image: "/team/member1.jpg",
    color: "bg-green-100 text-green-700",
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    name: "Team Member 2",
    role: "UI/UX Designer",
    image: "/team/member2.jpg",
    color: "bg-blue-100 text-blue-700",
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    name: "Team Member 3",
    role: "Backend Engineer",
    image: "/team/member3.jpg",
    color: "bg-purple-100 text-purple-700",
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    name: "Team Member 4",
    role: "Product Manager",
    image: "/team/member4.jpg",
    color: "bg-orange-100 text-orange-700",
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
];

import { useTeamModal } from "@/store/use-team-modal";

export const TeamPopup = () => {
  const { isOpen, close } = useTeamModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-4xl bg-white rounded-3xl border-2 border-b-4 border-slate-200 p-0 overflow-hidden">
        <div className="bg-green-500 p-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-extrabold text-white tracking-wide uppercase drop-shadow-md">
            Meet Our Team
          </h2>
          <p className="text-green-100 font-medium mt-2">The minds behind Gharti Academy</p>
        </div>

        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 rounded-xl border-2 border-b-4 border-slate-100 hover:border-green-200 hover:bg-green-50/50 transition-all duration-300 group"
            >
              <div className={`w-24 h-24 rounded-full mb-4 flex items-center justify-center text-2xl font-bold ${member.color} ring-4 ring-offset-2 ring-transparent group-hover:ring-green-400 transition-all`}>
                <Avatar className="w-full h-full">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback className={member.color}>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>

              <h3 className="font-bold text-slate-700 text-lg mb-1">{member.name}</h3>
              <p className="text-slate-500 text-sm font-medium mb-4">{member.role}</p>

              <div className="flex gap-3 mt-auto">
                <Link href={member.socials.facebook} className="text-slate-400 hover:text-blue-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href={member.socials.instagram} className="text-slate-400 hover:text-pink-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href={member.socials.linkedin} className="text-slate-400 hover:text-blue-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link href={member.socials.github} className="text-slate-400 hover:text-gray-900 transition-colors">
                  <Github className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
