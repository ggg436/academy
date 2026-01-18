"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/store/use-auth-modal";

const RegisterPage = () => {
    const router = useRouter();
    const { open } = useAuthModal();

    useEffect(() => {
        // Open the signup modal
        open("signup");
        // Redirect to home page
        router.replace("/");
    }, [open, router]);

    return null;
}

export default RegisterPage;
