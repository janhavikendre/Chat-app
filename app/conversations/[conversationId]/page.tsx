import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: Promise<IParams> }) => {
  const conversation = await getConversationById((await params).conversationId);
  const messages = await getMessages((await params).conversationId);

  if (!conversation) {
    return (
      <div
        className="lg:pl-80 h-full bg-cover bg-center"
      >
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full  bg-cover bg-center">
      <div className="h-full flex flex-col bg-[url('/images/wp.jpg')]">
        <Header conversation={conversation} />
        <Body initialMessages={messages || []} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
