import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useSuspenseParticipants = () => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.participants.getMany.queryOptions());
};

export const useQueryParticipants = () => {
  const trpc = useTRPC();
  return useQuery(trpc.participants.getMany.queryOptions());
};

export const useCreateParticipant = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.participants.create.mutationOptions({
      onSuccess: () => {
        toast.success("Participante criado com sucesso");

        queryClient.invalidateQueries(trpc.participants.getMany.queryOptions());
      },
      onError: () => {
        toast.error("Erro ao criar participante");
      },
    }),
  );
};

export const useQueryParticipant = (id: string) => {
  const trpc = useTRPC();
  return useQuery(
    trpc.participants.getOne.queryOptions({
      id,
    }),
  );
};

export const useDeleteParticipant = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.participants.delete.mutationOptions({
      onSuccess: () => {
        toast.success("Participante deletado com sucesso");

        queryClient.invalidateQueries(trpc.participants.getMany.queryOptions());
      },
      onError: () => {
        toast.error("Erro ao deletar participante");
      },
    }),
  );
};
