"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Instagram, Camera, Loader2, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../footer";
import { useEffect, useState, useRef } from "react";
import { getTeamMembers } from "@/actions/team";
import { toast } from "sonner";

interface TeamMember {
    id: number;
    role: string;
    name: string;
    image: string;
    order: number;
    socials: {
        github?: string;
        linkedin?: string;
        facebook?: string;
        instagram?: string;
    };
}

const TeamPage = () => {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await getTeamMembers();
                setMembers(data);
            } catch (error) {
                console.error("Failed to fetch team members:", error);
                toast.error("Failed to load team members");
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-slate-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-4">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-800">
                        Meet the team
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Our talented team of experts working together to build the future of education.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 max-w-7xl mx-auto">
                    {members.map((member, index) => (
                        <motion.div
                            key={member.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center group"
                        >
                            <div className="relative mb-6">
                                <div
                                    className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300 relative bg-slate-100"
                                >
                                    <Image
                                        src={member.image || "/man.svg"}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 mb-1 text-center">
                                {member.name}
                            </h3>
                            <p className="text-indigo-500 font-medium text-sm text-center uppercase tracking-wide mb-4">
                                {member.role}
                            </p>

                            <div className="flex items-center gap-3">
                                {member.socials.facebook && (
                                    <Link href={member.socials.facebook} className="text-slate-400 hover:text-[#1877F2] transition-colors hover:scale-110">
                                        <Facebook size={18} />
                                    </Link>
                                )}
                                {member.socials.instagram && (
                                    <Link href={member.socials.instagram} className="text-slate-400 hover:text-[#E4405F] transition-colors hover:scale-110">
                                        <Instagram size={18} />
                                    </Link>
                                )}
                                {member.socials.linkedin && (
                                    <Link href={member.socials.linkedin} className="text-slate-400 hover:text-[#0A66C2] transition-colors hover:scale-110">
                                        <Linkedin size={18} />
                                    </Link>
                                )}
                                {member.socials.github && (
                                    <Link href={member.socials.github} className="text-slate-400 hover:text-[#181717] transition-colors hover:scale-110">
                                        <Github size={18} />
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default TeamPage;

