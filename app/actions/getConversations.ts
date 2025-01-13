import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversations = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
        return []
    }

    try {
        const conversations = await prisma.conversation.findMany({
            orderBy: {
                lastMessageAt: 'desc'
            },
            where: {
                userIds: {
                    has: currentUser.id
                },
                createdAt: {
                    gte: new Date(0)
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    }
                }
            }
        });

        return conversations

    } catch (error: any) {
        console.error(`Error in getConversations: ${error.message}`);
        return []
    }
}

export default getConversations;