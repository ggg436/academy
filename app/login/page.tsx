"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/store/use-auth-modal";

const LoginPage = () => {
    const router = useRouter();
    const { open } = useAuthModal();

    useEffect(() => {
        // Open the login modal
        open("login");
        // Redirect to home page
        router.replace("/");
    }, [open, router]);

    return null;
}

export default LoginPage;
