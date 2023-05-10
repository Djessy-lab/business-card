/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { cardRouter } from './routers/card';
import { router } from './trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  card: cardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
