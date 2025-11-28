// src/server/index.ts
import { authRouter } from "./routers/auth";
import { marketplaceRouter } from "./routers/marketplace";
import { messageRouter } from "./routers/message";
import { programRouter } from "./routers/program";
import { router } from "./trpc";

export const appRouter = router({
  auth: authRouter,
  message: messageRouter,
  program: programRouter,
  marketplace: marketplaceRouter,
});

export type AppRouter = typeof appRouter;
