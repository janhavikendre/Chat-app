import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import {
    HiArrowLeftOnRectangle,
    HiUsers
} from "react-icons/hi2";
import { signOut } from "next-auth/react";

import useConversation from "./useConversation";
import { useMemo } from "react";

const useRoutes = () => {
    const pathname = usePathname();
    const { conversationId } = useConversation();

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations' || !!conversationId
        },
        {
            label: 'Users',
            href: '/users',
            icon: HiUsers,
            active: pathname === '/users'
        },
        {
            label: 'Logout',
            onClick: () => signOut({
                callbackUrl: 'https://chat-app-u29r.vercel.app/'
            }),
            icon: HiArrowLeftOnRectangle,
            href: '#'
        }
    ], [pathname, conversationId]);

    return routes;
}

export default useRoutes;
