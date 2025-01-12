import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(request: Request) {
    try {
        // Get the conversationId from the URL path
        const { pathname } = new URL(request.url);
        const conversationId = pathname.split('/')[4]; // Assuming the URL is structured like /api/conversations/[conversationId]

        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!conversationId) {
            return new NextResponse('Invalid conversation ID', { status: 400 });
        }

        // Delete all messages in the conversation
        await prisma.message.deleteMany({
            where: {
                conversationId: conversationId
            }
        });

        const existingConversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        });

        if (!existingConversation) {
            return new NextResponse('Invalid Id', { status: 404 });
        }

        // Delete the conversation itself
        const deletedConversation = await prisma.conversation.delete({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        });

        // Notify users about the conversation removal
        existingConversation.users.forEach((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, 'conversation:remove', existingConversation);
            }
        });

        return NextResponse.json(deletedConversation);

    } catch (error) {
        console.log("ERROR_CONVERSATION_DELETE", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
