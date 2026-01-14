import { prefetch, trpc } from "@/trpc/server";

export const prefetchParticipants = () => {
  return prefetch(trpc.participants.getMany.queryOptions());
};
