import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface IParams {
    conversationId: string;  // Remove the optional marker (?)
}

export async function POST(
    request: Request,
    context: { params: IParams }  // Change this line to use context
) {
    try {
        const { conversationId } = context.params;  // Access params through context
        const currentUser = await getCurrentUser();
        
        if (!currentUser?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

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

        const deletedConversation = await prisma.conversation.delete({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        });

        existingConversation.users.forEach((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, 'conversation:remove', existingConversation);
            }
        });

        return NextResponse.json(deletedConversation);

    } catch(error) {
        console.log("ERROR_CONVERSATION_DELETE", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}