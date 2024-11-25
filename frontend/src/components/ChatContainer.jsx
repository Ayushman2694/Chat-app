import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from ".//MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { MessageSquare } from "lucide-react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    // subscribeToMessages,
    // unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    // subscribeToMessages();

    // return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages /*, subscribeToMessages, unsubscribeFromMessages*/,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  console.log(messages);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length == 0 ? (
          <div className="w-full flex flex-1 flex-col items-center justify-center p-20 bg-base-100/50">
            <div className="max-w-md text-center space-y-6">
              {/* Icon Display */}
              <div className="flex justify-center gap-4 mb-4">
                <div className="relative">
                  <div
                    className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
                  >
                    <MessageSquare className="w-8 h-8 text-primary " />
                  </div>
                </div>
              </div>

              {/* Welcome Text */}
              <h2 className="text-2xl font-bold">Welcome to Convohub!</h2>
              <p className="text-base-content/60">
                Start the conversation by sending hey!!!{" "}
              </p>
            </div>
          </div>
        ) : (
          messages?.map((message) => (
            <div
              key={message._id}
              className={`chat ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
              ref={messageEndRef}
            >
              <div className=" chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          ))
        )}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
