"use client"

import { Check, Copy } from "lucide-react";

import ChatAvatar from "./chat-avatar";
import { Message } from "../lib/types";
import Markdown from "./markdown";
import { useCopyToClipboard } from "./use-copy-to-clipboard";

export default function ChatMessage(chatMessage: Message) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });
  return (
    <div className="flex items-start gap-4 w-full pb-5">
      <ChatAvatar role={chatMessage.role} />
      <div className="group flex flex-1 justify-between gap-2">
        <div className="flex-1">
          <Markdown content={chatMessage.content} />
        </div>
        <button
          onClick={() => copyToClipboard(chatMessage.content)}
          className="h-8 w-8 opacity-0 group-hover:opacity-100"
        >
          {isCopied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}