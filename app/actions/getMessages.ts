import prisma from '@/app/libs/prismadb';

const getMessages = async (
    conversationId: string
) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                conversationId: conversationId
            },
            include: {
                sender: true,
                seen: true,
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        return messages;
    } catch (error: any) {
        console.error(`Error in getMessages: ${error.message}`);
        return [];
    }
}

export default getMessages;