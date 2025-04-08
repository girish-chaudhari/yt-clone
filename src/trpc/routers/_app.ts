import { studioRouter } from "@/modules/studio/server/proceedures";
import { videosRouter } from "@/modules/videos/server/proceedures";
import { categoriesRouter } from "@/modules/categories/server/proceedures";
import { videoViewsRouter } from "@/modules/video-views/server/proceedures";
import { videoReactionsRouter } from "@/modules/video-reactions/server/proceedures";

import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  studio: studioRouter,
  categories: categoriesRouter,
  videos: videosRouter,
  videoViews: videoViewsRouter,
  videoReactions: videoReactionsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
