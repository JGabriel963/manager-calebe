"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { AddParticipant } from "@/features/participants/components/add-participant";
import { ParticipantList } from "@/features/participants/components/participants";
import { Plus, SearchIcon, UsersIcon } from "lucide-react";
import { useState } from "react";

export function Participants() {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="flex flex-row items-center gap-2">
            <UsersIcon className="size-4 text-blue-500" />
            Participantes
          </CardTitle>
          <AddParticipant open={open} onOpenChange={setOpen}>
            <Button>
              <Plus className="size-4" />
              Adicionar
            </Button>
          </AddParticipant>
        </div>
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon className="size-4" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Buscar por nome ou e-mail" />
        </InputGroup>
      </CardHeader>
      <ParticipantList />
    </Card>
  );
}
