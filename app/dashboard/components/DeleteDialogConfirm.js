import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

import { revalidateCache } from "@/lib/actions";
import { X } from "lucide-react";

export default function DeleteDialogConfirm({ id }) {
  const { toast } = useToast();
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <X size={15} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas seguro de eliminar el item</AlertDialogTitle>
          <AlertDialogDescription>
            Al realizar esta acción no será posible revertirla nuevamente ya que
            dicha información se elimina de la base de datos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              fetch(process.env.API_END_POINT + "/" + id, {
                method: "DELETE",
              }).then((res) => {
                if (!res.ok) {
                  toast({
                    description:
                      "Hubo un error al querer eliminar el item, intente nuevamente o contacte con el administrador.",
                  });
                } else {
                  toast({
                    description: "Se elimino de forma correcta el item.",
                  });
                }
                revalidateCache();
              });
            }}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
