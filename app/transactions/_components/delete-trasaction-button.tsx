"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { TrashIcon } from "lucide-react";
import { deleteTransaction } from "../_actions/delete-transaction";
import { toast } from "sonner";

interface DeleteTransactionButtonProps {
  transactionId: string;
}
const DeleteTransactionButton = ({
  transactionId,
}: DeleteTransactionButtonProps) => {
  const handleConfirmDeleteClick = async () => {
    try {
      await deleteTransaction({ transactionId });
      toast.success("Transação deleta com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu uma erro ao tentar deletar a  transação !");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja realmente deletar esta transação?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não poderá ser desfeita e irá remover permanentemente seu
            dados de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDeleteClick}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTransactionButton;
