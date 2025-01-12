import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

const useOtherUser = (conversation: FullConversationType | { users: User[] }) => {
    const session = useSession();

    const otherUser = useMemo(() => {
        const currentUserEmail = session?.data?.user?.email;

        // Exclude the current user from the list of users
        const otherUsers = conversation.users.filter((user) => user.email !== currentUserEmail);

        // Return the first user in the filtered list (other user)
        return otherUsers[0];
    }, [session?.data?.user?.email, conversation.users]);

    return otherUser;
}

export default useOtherUser;
