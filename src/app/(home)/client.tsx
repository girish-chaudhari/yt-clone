"use client";

import { trpc } from "@/trpc/client";

export const PageClient = () => {
  const [data] = trpc.hello.useSuspenseQuery({ text: "from tRPC" })

  return (
    <div>
      PageClient component says: {data?.greeting}
    </div>
  );
}