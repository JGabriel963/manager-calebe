"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  ParticipantList,
  ParticipantsCheckins,
} from "@/features/participants/components/participants";
import { SearchIcon, UserCheckIcon } from "lucide-react";

export function Checkins() {
  // const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="flex flex-row items-center gap-2">
            <UserCheckIcon className="size-4 text-blue-500" />
            Presenças
          </CardTitle>
          {/* <AddParticipant open={open} onOpenChange={setOpen}>
            <Button>
              <Plus className="size-4" />
              Pontos
            </Button>
          </AddParticipant> */}
        </div>
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon className="size-4" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Buscar por nome ou e-mail" />
        </InputGroup>
      </CardHeader>
      <ParticipantsCheckins />
    </Card>
  );
}
