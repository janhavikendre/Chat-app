import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

interface IParams {
    conversationId?: string;
}

export async function POST(
    request: Request,
    { params }: { params: Promise<IParams> }
) {
    try {
        const { conversationId } =await params;
        const currentUser = await getCurrentUser();
        
        if (!currentUser?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!conversationId) {
            return new NextResponse('Invalid conversation ID', { status: 400 });
        }

        // First of all choti janhavi i am dleting all message in an converstaion
        await prisma.message.deleteMany({
            where: {
                conversationId: conversationId
            }
        });

        // and then deleteing the whole conversation
        const deletedConversation = await prisma.conversation.delete({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        });

        return NextResponse.json(deletedConversation);

    } catch(error) {
        console.log("ERROR_CONVERSATION_DELETE", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}