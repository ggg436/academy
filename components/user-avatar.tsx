"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  userName: string;
  userImageSrc: string;
}

export function UserAvatar({ userName, userImageSrc }: UserAvatarProps) {
  return (
    <Avatar className="border-2 border-green-200 bg-green-50 h-12 w-12 ml-3 mr-6 shadow-sm">
      <AvatarImage
        className="object-cover rounded-full"
        src={userImageSrc}
        alt={userName}
        onError={(e) => {
          console.log('Avatar image failed to load:', userImageSrc);
          e.currentTarget.style.display = 'none';
        }}
        onLoad={() => {
          console.log('Avatar image loaded successfully:', userImageSrc);
        }}
      />
      <AvatarFallback className="bg-green-100 text-green-600 text-xs font-semibold border-2 border-green-200">
        {userName ? userName.charAt(0).toUpperCase() : 'U'}
      </AvatarFallback>
    </Avatar>
  );
} 
