import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

interface Params {
  conversationId: string;
}

export async function POST(
  request: Request,
  { params }: { params: Promise<Params> }
) {
  try {
    const { conversationId } = await params; // Access dynamic route params directly
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!conversationId) {
      return new NextResponse("Invalid conversation ID", { status: 400 });
    }

    // Find the conversation
    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Conversation not found", { status: 404 });
    }

    // Check if the current user is part of the conversation
    if (!existingConversation.userIds.includes(currentUser.id)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Delete all messages in the conversation
    await prisma.message.deleteMany({
      where: {
        conversationId,
      },
    });

    // Delete the conversation
    const deletedConversation = await prisma.conversation.delete({
      where: {
        id: conversationId,
      },
    });

    // Notify all users in the conversation
    existingConversation.users.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:remove", deletedConversation);
      }
    });

    return NextResponse.json(deletedConversation);
  } catch (error) {
    console.error("ERROR_CONVERSATION_DELETE:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
