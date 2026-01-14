import { createTRPCRouter } from "../init";
import { participantsRouter } from "@/features/participants/server/route";
export const appRouter = createTRPCRouter({
  participants: participantsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
