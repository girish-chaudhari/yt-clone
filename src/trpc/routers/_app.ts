import { studioRouter } from "@/modules/studio/server/procedures";
import { videosRouter } from "@/modules/videos/server/procedures";
import { categoriesRouter } from "@/modules/categories/server/procedures";
import { videoViewsRouter } from "@/modules/video-views/server/proceedures";
import { videoReactionsRouter } from "@/modules/video-reactions/server/procedures";

import { createTRPCRouter } from "../init";
import { subscriptionsRouter } from "@/modules/subscriptions/server/procedures";

export const appRouter = createTRPCRouter({
  studio: studioRouter,
  videos: videosRouter,
  categories: categoriesRouter,
  videoViews: videoViewsRouter,
  subscriptions: subscriptionsRouter,
  videoReactions: videoReactionsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
