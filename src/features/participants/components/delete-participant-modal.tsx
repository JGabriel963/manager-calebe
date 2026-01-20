import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteParticipant } from "../hooks/use-participants";

export function DeleteParticipantModal({
  open,
  onOpenChange,
  participantId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  participantId: string;
}) {
  const deleteParticipant = useDeleteParticipant();

  const handleDelete = () => {
    if (!participantId) return;
    deleteParticipant.mutate({ id: participantId });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar participante</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja deletar este participante?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete}>
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
