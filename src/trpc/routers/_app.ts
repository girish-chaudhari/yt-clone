import { categoriesRouter } from "@/modules/categories/server/proceedures";

import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
 categories: categoriesRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
