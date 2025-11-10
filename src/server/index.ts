import { aboutRouter } from "./routers/about";
import { authRouter } from "./routers/auth";
import { heroRouter } from "./routers/hero";
import { messageRouter } from "./routers/message";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  hero: heroRouter,
  about: aboutRouter,
  message: messageRouter,
});

export type AppRouter = typeof appRouter;
