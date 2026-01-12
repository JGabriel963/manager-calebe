import { Badge } from "@/components/ui/badge";
import { ClockIcon, TimerIcon } from "lucide-react";

export function Header() {
  return (
    <header className="bg-card/50 backdrop-blur-sm sticky top-0 z-50 py-4 border-b border-border flex items-center justify-center">
      <div className="container px-4 flex items-center justify-between">
        <div>
          <span className="text-lg">
            Calebe <strong>S.O.C.O.P.O</strong>
          </span>
        </div>
        <Badge variant="secondary">
          <ClockIcon className="size-4" />
          15 dias
        </Badge>
      </div>
    </header>
  );
}
