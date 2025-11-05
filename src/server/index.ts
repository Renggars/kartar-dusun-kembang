import { authRouter } from "./routers/auth";
import { heroRouter } from "./routers/hero";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  hero: heroRouter,
});

export type AppRouter = typeof appRouter;
