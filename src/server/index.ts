import { aboutRouter } from "./routers/about";
import { authRouter } from "./routers/auth";
import { heroRouter } from "./routers/hero";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  hero: heroRouter,
  about: aboutRouter,
});

export type AppRouter = typeof appRouter;
