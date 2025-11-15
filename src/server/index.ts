// src/server/index.ts
import { aboutRouter } from "./routers/about";
import { authRouter } from "./routers/auth";
import { heroRouter } from "./routers/hero";
import { messageRouter } from "./routers/message";
import { programRouter } from "./routers/program";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  hero: heroRouter,
  about: aboutRouter,
  message: messageRouter,
  program: programRouter,
});

export type AppRouter = typeof appRouter;
