"use client";

import { Spinner } from "@/components/ui/spinner";
import { useQueryParticipants } from "../hooks/use-participants";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { CalendarDaysIcon } from "lucide-react";
import { AddPoints } from "./add-points";
import { useState } from "react";

export const ParticipantList = () => {
  const { data, isPending } = useQueryParticipants();

  return (
    <div className="space-y-2 px-5">
      {isPending && (
        <div className="flex items-center justify-center gap-2 ">
          <Spinner />
          <span>Carregando...</span>
        </div>
      )}

      {!isPending &&
        data &&
        data.map((participant) => {
          const totalPoints = participant.points.reduce(
            (acc, point) => acc + point.points,
            0
          );

          const totalCheckedIn = participant.checkins.length ?? 0;

          return (
            <Item size="sm" variant="outline" key={`${participant.id}-list`}>
              <ItemContent>
                <ItemTitle>{participant.name}</ItemTitle>
                <ItemDescription>{participant.phone}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <div className="flex flex-col items-center">
                  <span className="text-sm font-bold">{totalPoints} pts</span>
                  <span className="text-xs text-muted-foreground">
                    {totalCheckedIn} presenças
                  </span>
                </div>
              </ItemActions>
            </Item>
          );
        })}
    </div>
  );
};

export const ParticipantsCheckins = () => {
  const { data, isPending } = useQueryParticipants();
  const [open, setOpen] = useState(false);
  const [participantId, setParticipantId] = useState<string | null>(null);

  return (
    <>
      <div className="space-y-2 px-5">
        {isPending && (
          <div className="flex items-center justify-center gap-2 ">
            <Spinner />
            <span>Carregando...</span>
          </div>
        )}

        {!isPending &&
          data &&
          data.map((participant) => {
            const totalPoints = participant.points.reduce(
              (acc, point) => acc + point.points,
              0
            );

            const totalCheckedIn = participant.checkins.length ?? 0;

            return (
              <Item
                size="sm"
                variant="outline"
                key={`${participant.id}-checkins`}
              >
                <ItemContent>
                  <ItemTitle>{participant.name}</ItemTitle>
                  <ItemDescription>{participant.phone}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-bold">{totalPoints} pts</span>
                    <span className="text-xs text-muted-foreground">
                      {totalCheckedIn} presenças
                    </span>
                  </div>
                </ItemActions>
                <ItemActions>
                  <Button
                    onClick={() => {
                      setParticipantId(participant.id);
                      setOpen(true);
                    }}
                    variant={true ? "default" : "outline"}
                  >
                    <CalendarDaysIcon className="size-4" />
                  </Button>
                </ItemActions>
              </Item>
            );
          })}
      </div>
      <AddPoints
        participantId={participantId}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
};
