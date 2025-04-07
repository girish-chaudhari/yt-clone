import { studioRouter } from "@/modules/studio/server/proceedures";
import { videosRouter } from "@/modules/videos/server/proceedures";
import { categoriesRouter } from "@/modules/categories/server/proceedures";

import { createTRPCRouter } from "../init";
import { videoViewsRouter } from "@/modules/video-views/server/proceedures";

export const appRouter = createTRPCRouter({
  studio: studioRouter,
  categories: categoriesRouter,
  videos: videosRouter,
  videoViews: videoViewsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
