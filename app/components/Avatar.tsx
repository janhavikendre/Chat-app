'use client';

import { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from "../hooks/useActiveList";


interface AvatarProps {
    user?: User;
}

const Avatar: React.FC<AvatarProps> = ({
    user
}) => {
    const { members } = useActiveList();
    const isActive = user?.email ? members.indexOf(user.email) !== -1 : false;


    return (
        <div className="relative">
            <div 
            className="realtive inline-block rounded-full overflow-hidden h-8 w-10 md:h-8 md:w-10">

           <Image 
           alt="Avatar"
           src={user?.image || "/images/placeholder.jpg"}
           fill
           className=" rounded-full "

           />
 
           </div>
          {isActive && (
           <span 
           className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3"
              />
            )}

            
            </div>
    )
}

export default Avatar;