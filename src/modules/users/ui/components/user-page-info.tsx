import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import { useAuth } from "@clerk/clerk-react";
import { UserAvatar } from "@/components/user-avatar";

import { UserGetOneOutput } from "../../types";
import { Button } from "@/components/ui/button";
import { SubscriptionButton } from "@/modules/subscriptions/ui/components/subscription-button";
import { useSubscription } from "@/modules/subscriptions/hooks/use-subscription";

interface UserPageInfoProps {
  user: UserGetOneOutput;
}

export const UserPageInfo = ({ user }: UserPageInfoProps) => {
  const { userId, isLoaded } = useAuth();
  const clerk = useClerk();

  const { isPending, onClick } = useSubscription({
    userId: user.id,
    isSubscribed: user.viewerSubscribed,
  });

console.log(user)

  return (
    <div className="py-6">
      {/* Mobile layout */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center gap-3">
          <UserAvatar
            size="lg"
            imageUrl={user.imageUrl}
            name={user.name}
            className="h-[60px] w-[60px]"
            onClick={() => {
              if (user.clerkId === userId) {
                clerk.openUserProfile();
              }
            }}
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold">{user.name}</h1>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <span>{user.subscriberCount} Subscribers</span>
              <span>&bull;</span>
              <span>{user.videoCount} Videos</span>
            </div>
          </div>
        </div>
        {userId === user.clerkId ? (
          <Button
            variant="secondary"
            asChild
            className="w-full mt-3 rounded-full"
          >
            <Link href="/studio">Go to studio</Link>
          </Button>
        ) : (
          <SubscriptionButton
            disabled={isPending || !isLoaded}
            isSubscribed={user.viewerSubscribed}
            onClick={onClick}
            className="w-full mt-3"
          />
        )}
      </div>
    </div>
  );
};
