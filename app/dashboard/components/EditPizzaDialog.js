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
import { useToast } from "@/components/ui/use-toast";

import { revalidateCache } from "@/lib/actions";
import { Edit } from "lucide-react";
import NewPizzaForm from "./NewPizzaForm";
import { useState } from "react";
import { updatedPizzaSchema } from "@/utils/schemas/newPizzaSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createJSONFromForm } from "@/lib/utils";

export default function EditPizzaDialog({ data, id }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();

  if (!data) {
    return "";
  }

  const form = useForm({
    resolver: yupResolver(updatedPizzaSchema),
    defaultValues: {
      name: data.name,
      price: data.price,
      description: data.description,
      img: "",
    },
  });

  async function handleSubmit(data, e) {
    const jsonPizza = await createJSONFromForm(data, e);
    setIsLoading(true);
    try {
      const res = await fetch("/api/pizzas", {
        method: "PUT",
        body: jsonPizza,
      });
      console.log(res);
      if (!res.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }
      setMessage({
        status: "ok",
        msg: "Item modificado correctamente",
      });
    } catch (e) {
      console.error(e);
      setMessage({
        status: "error",
        msg: e,
      });
    } finally {
      setIsLoading(false);
      revalidateCache();
      form.reset();
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Edit size={17} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Editar un item</AlertDialogTitle>
          <AlertDialogDescription>
            Aca puedes cambiar algun o todos los campos del item seleccionado.
          </AlertDialogDescription>
          <NewPizzaForm
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            message={message}
            form={form}
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              fetch(process.env.API_END_POINT + "/" + id, {
                method: "PUT",
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
