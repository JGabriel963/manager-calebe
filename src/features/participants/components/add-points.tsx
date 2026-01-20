"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDaysIcon } from "lucide-react";
import { useQueryParticipant } from "../hooks/use-participants";
import { Spinner } from "@/components/ui/spinner";

interface AddParticipantProps {
  participantId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
// Fix
const times = [
  {
    label: "Domingo",
    description: "18 de janeiro",
    date: new Date("2026-01-18"),
  },
  {
    label: "Segunda-Feira",
    description: "19 de janeiro",
    date: new Date("2026-01-19"),
  },
  {
    label: "Terça-Feira",
    description: "20 de janeiro",
    date: new Date("2026-01-20"),
  },
  {
    label: "Quarta-Feira",
    description: "21 de janeiro",
    date: new Date("2026-01-21"),
  },
  {
    label: "Quinta-Feira",
    description: "22 de janeiro",
    date: new Date("2026-01-22"),
  },
  {
    label: "Sexta-Feira",
    description: "23 de janeiro",
    date: new Date("2026-01-23"),
  },
  {
    label: "Sábado",
    description: "24 de janeiro",
    date: new Date("2026-01-24"),
  },
  {
    label: "Domingo",
    description: "25 de janeiro",
    date: new Date("2026-01-25"),
  },
  {
    label: "Segunda-Feira",
    description: "26 de janeiro",
    date: new Date("2026-01-26"),
  },
  {
    label: "Terça-Feira",
    description: "27 de janeiro",
    date: new Date("2026-01-27"),
  },
  {
    label: "Quarta-Feira",
    description: "28 de janeiro",
    date: new Date("2026-01-28"),
  },
  {
    label: "Quinta-Feira",
    description: "29 de janeiro",
    date: new Date("2026-01-29"),
  },
  {
    label: "Sexta-Feira",
    description: "30 de janeiro",
    date: new Date("2026-01-30"),
  },
  {
    label: "Sábado",
    description: "31 de janeiro",
    date: new Date("2026-01-31"),
  },
];

export const AddPoints = ({
  participantId,
  open,
  onOpenChange,
}: AddParticipantProps) => {
  if (!participantId) {
    return null;
  }
  const { data, isPending } = useQueryParticipant(participantId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center gap-2 text-blue-500">
            {" "}
            <CalendarDaysIcon className="size-4" /> Adicionar pontos
          </DialogTitle>
        </DialogHeader>
        {isPending && (
          <div className="flex items-center justify-center gap-2 ">
            <Spinner />
            <span>Carregando...</span>
          </div>
        )}
        {!isPending && (
          <div className="space-y-2">
            <Item variant="muted" size="sm">
              <ItemContent>
                <ItemTitle>{data?.name}</ItemTitle>
                <ItemDescription>{data?.phone}</ItemDescription>
              </ItemContent>
            </Item>
            <ScrollArea className="h-[300px]">
              {times.map((time, index) => (
                <Item variant="outline" size="sm" className="mt-2">
                  <ItemMedia variant="icon">{index + 1}</ItemMedia>
                  <ItemContent>
                    <ItemTitle>{time.label}</ItemTitle>
                    <ItemDescription>{time.description}</ItemDescription>
                  </ItemContent>
                  <ItemActions></ItemActions>
                </Item>
              ))}
            </ScrollArea>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
