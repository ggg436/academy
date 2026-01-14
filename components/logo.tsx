import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    variant?: "default" | "white";
}

export const Logo = ({ className, variant = "default" }: LogoProps) => {
    return (
        <div className={cn("flex items-center", className)}>
            <h1 className={cn(
                "text-xl sm:text-2xl font-bold tracking-tight",
                variant === "white" ? "text-white" : "text-green-600"
            )}>
                Gharti Academy
            </h1>
        </div>
    );
};
