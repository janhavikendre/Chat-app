'use client';

import { User } from "@prisma/client";
import { UserRound } from 'lucide-react';
import Image from "next/image";


interface AvatarProps {
    user?: User;
}

const Avatar: React.FC<AvatarProps> = ({
    user
}) => {
    return (
        <div className="relative">
            <div 
            className="realtive inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">

           <UserRound 
              size={32}
           />
           <span 
           className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3"
              />

            </div>
            </div>
    )
}

export default Avatar;