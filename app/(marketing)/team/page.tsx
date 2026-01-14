"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Instagram, Camera, Loader2, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "../footer";
import { useEffect, useState, useRef } from "react";
import {
    getFirebaseFirestore,
    getFirebaseStorage
} from "@/lib/firebase-client";
import {
    collection,
    getDocs,
    query,
    orderBy,
    addDoc,
    writeBatch,
    doc,
    updateDoc,
    onSnapshot
} from "firebase/firestore";
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";
import { toast } from "sonner"; // Assuming sonner or some toast exists, else normal alert
// If toast is not available in the project, I will use alert or simple console log for now, 
// but looking at imports in other files, likely ui/use-toast or similar. 
// I'll stick to basic alerts or conditional rendering for simplicity if I can't find it.
// Checking previous files: "lucide-react" used. I'll use standard window.alert for critical errors if needed or just console.

interface TeamMember {
    id?: string;
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

const initialTeamMembers: TeamMember[] = [
    {
        order: 1,
        role: "CEO & Founder",
        name: "Sanjok Gharti",
        image: "/sanjok.png",
        socials: {
            facebook: "https://www.facebook.com/profile.php?id=61569939773422",
            instagram: "https://www.instagram.com/sanjokgc87/",
            linkedin: "https://www.linkedin.com/in/sanjok-gharti-19516a320/",
            github: "https://github.com/sanjok-gharti"
        }
    },
    {
        order: 2,
        role: "COO",
        name: "Sangam Gharti",
        image: "/man.svg", // Placeholder
        socials: {
            facebook: "https://www.facebook.com/sangam.gc.965"
        }
    },
    {
        order: 3,
        role: "CTO",
        name: "Prabin K. Yadav",
        image: "/prabin.png",
        socials: {
            facebook: "https://www.facebook.com/BusyToZen"
        }
    },
    {
        order: 4,
        role: "Operations Manager",
        name: "Bal Krishna",
        image: "/man.svg",
        socials: {
            facebook: "https://www.facebook.com/profile.php?id=100057539067167",
            instagram: "https://www.instagram.com/balkrishna.13/",
            linkedin: "https://www.linkedin.com/in/bal-krishna-928a23218/"
        }
    },
    {
        order: 5,
        role: "Content Writer",
        name: "Abhishek Sah",
        image: "/man.svg",
        socials: {
            facebook: "https://www.facebook.com/BusyToZen"
        }
    },
    {
        order: 6,
        role: "Social Media Manager",
        name: "Sushant Sah",
        image: "/man.svg",
        socials: {}
    }
];

const TeamPage = () => {
    const [members, setMembers] = useState<TeamMember[]>(initialTeamMembers);
    const [loading, setLoading] = useState(true);
    const [uploadingId, setUploadingId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

    useEffect(() => {
        const db = getFirebaseFirestore();
        if (!db) {
            setLoading(false);
            return;
        }

        const q = query(collection(db, "team"), orderBy("order"));

        const unsubscribe = onSnapshot(q, async (snapshot) => {
            if (snapshot.empty) {
                // Seed data if empty
                // Use a flag to prevent double seeding in strict mode if needed, 
                // but checking empty again inside is safer.
                // We'll just set loading false and maybe let a manual trigger or auto-seed?
                // Let's auto-seed for better UX.
                console.log("Seeding team data...");
                const batch = writeBatch(db);
                initialTeamMembers.forEach((member) => {
                    const docRef = doc(collection(db, "team"));
                    batch.set(docRef, member);
                });
                await batch.commit();
                // The snapshot listener will fire again with data
            } else {
                const fetchedMembers = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as TeamMember));
                setMembers(fetchedMembers);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleImageClick = (memberId: string) => {
        if (!memberId) return; // Can't upload strictly for initial data without IDs
        setSelectedMemberId(memberId);
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !selectedMemberId) return;

        try {
            setUploadingId(selectedMemberId);
            const storage = getFirebaseStorage();
            const db = getFirebaseFirestore();

            if (!storage || !db) throw new Error("Firebase not initialized");

            const storageRef = ref(storage, `team-uploads/${selectedMemberId}/${file.name}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            await updateDoc(doc(db, "team", selectedMemberId), {
                image: downloadURL
            });

            // Optimistic update handled by snapshot listener
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image. Check console for details.");
        } finally {
            setUploadingId(null);
            setSelectedMemberId(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

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

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    aria-label="Upload profile image"
                />

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
                                    className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300 relative bg-slate-100 cursor-pointer"
                                    onClick={() => member.id && handleImageClick(member.id)}
                                >
                                    {uploadingId === member.id && (
                                        <div className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center">
                                            <Loader2 className="w-8 h-8 text-white animate-spin" />
                                        </div>
                                    )}

                                    {/* Overlay for "Upload" hint */}
                                    <div className="absolute inset-0 z-10 bg-black/0 hover:bg-black/30 flex items-center justify-center transition-colors duration-300 group-hover/image">
                                        <Upload className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 w-8 h-8" />
                                    </div>

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
