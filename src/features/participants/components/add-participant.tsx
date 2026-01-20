"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateParticipant } from "../hooks/use-participants";
import { Spinner } from "@/components/ui/spinner";

interface AddParticipantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const createParticipantSchema = z.object({
  name: z.string().min(1, "Campo obrigatório"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type CreateParticipantSchema = z.infer<typeof createParticipantSchema>;

const formatPhoneNumber = (value: string): string => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "");

  // Aplica a máscara (XX) XXXXX-XXXX
  if (numbers.length <= 2) {
    return numbers;
  } else if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  } else if (numbers.length <= 11) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
      7,
      11,
    )}`;
  }

  // Limita a 11 dígitos
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
    7,
    11,
  )}`;
};

export const AddParticipant = ({
  children,
  open,
  onOpenChange,
}: AddParticipantProps) => {
  const form = useForm<CreateParticipantSchema>({
    resolver: zodResolver(createParticipantSchema),
  });
  const createParticipant = useCreateParticipant();

  const onSubmit = (data: CreateParticipantSchema) => {
    createParticipant.mutate(data, {
      onSuccess: () => {
        onOpenChange(false);
        form.reset();
      },
    });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    form.setValue("phone", formatted);
  };

  const isLoading = createParticipant.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar participante</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome completo</FieldLabel>
              <Input
                id="name"
                disabled={isLoading}
                autoComplete="off"
                placeholder="Digite o nome"
                {...form.register("name")}
              />
              <FieldError>{form.formState.errors.name?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Telefone</FieldLabel>
              <Input
                id="phone"
                disabled={isLoading}
                autoComplete="off"
                placeholder="(XX) XXXXX-XXXX"
                value={form.watch("phone") || ""}
                onChange={handlePhoneChange}
              />
              <FieldError>{form.formState.errors.phone?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="address">Endereço</FieldLabel>
              <Textarea
                id="address"
                disabled={isLoading}
                autoComplete="off"
                placeholder="Digite o endereço"
                {...form.register("address")}
              />
              <FieldError>{form.formState.errors.address?.message}</FieldError>
            </Field>
          </FieldGroup>
          <Button className="mt-4 w-full" type="submit" disabled={isLoading}>
            {isLoading && <Spinner />}
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
