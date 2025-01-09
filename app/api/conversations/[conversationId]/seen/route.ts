import getCurrentUser from "@/app/actions/getCurrentUser";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

interface IParams {
    conversationId?: string;
};

export async function POST(
    request: Request,
    { params }: { params: IParams}
) {
    try {
        const currentUser = await getCurrentUser();
        const {
            conversationId
        } = params;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401});
        }

        const prisma = new PrismaClient();
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages : {
                    include: {
                        seen: true
                    }
                },
                users: true
            }

        });


        if (!conversation) {
            return new NextResponse('Not Found', { status: 404});
        }

        const lastMessage = conversation.messages[conversation.messages.length - 1];

        if (!lastMessage) {
            return  NextResponse.json(conversation)
        }

        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                seen: true,
                sender: true
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        })

        return  NextResponse.json(updatedMessage)

    } catch (error: any) {
        console.log(error, 'ERROR_MESSAGES_SEEN');
        return new NextResponse("Internal Error", {status: 500});
    }
    
}