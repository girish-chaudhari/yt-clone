"use client";

import { Suspense } from "react";
import { trpc } from "@/trpc/client";
import { ErrorBoundary } from "react-error-boundary";
import UserPageBanner from "../components/user-page-banner";
import { UserPageInfo } from "../components/user-page-info";

interface UserSectionProps {
  userId: string;
}

export const UserSection = (props: UserSectionProps) => {
  return (
    <Suspense fallback={<UserSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <UserSectionSuspense {...props} />
      </ErrorBoundary>
    </Suspense>
  );
};

const UserSectionSkeleton = () => {
  return <div>Loading...</div>;
};

const UserSectionSuspense = ({ userId }: UserSectionProps) => {
  const [user] = trpc.users.getOne.useSuspenseQuery({ id: userId });

  return (
    <div className="flex flex-col">
      <UserPageBanner user={user} />
      <UserPageInfo user={user} />
    </div>
  );
};
