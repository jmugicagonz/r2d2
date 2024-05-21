'use client'

import { User2 } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function ChatAvatar({ role }: { role: string }) {
const { data: session } = useSession();

  if (role === "user") {
    return (
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-background shadow relative">
        {session?.user?.image? 
          <Image
            className="rounded-md"
            src={session?.user?.image}
            alt="User Image"
            layout="fill"
            objectFit="cover"
            priority
          />
          :
          <User2 className="h-4 w-4" />
        }
      </div>
    );
  }

  return (
    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border bg-white text-white shadow">
      <Image
        className="rounded-md"
        src="/gcpicon.png"
        alt="GCP Logo"
        width={24}
        height={24}
        priority
      />
    </div>
  );
}
