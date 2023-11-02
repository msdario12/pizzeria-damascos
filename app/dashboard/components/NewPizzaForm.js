"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import newPizzaSchema from "@/utils/schemas/newPizzaSchema";
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { revalidatePath } from "next/cache";
import { revalidateCache } from "@/lib/actions";

const createBase64Img = (file) => {
  return new Promise((res, rej) => {
    const fileReader = new FileReader();
    fileReader.addEventListener("load", (e) => {
      const base64Img = e.target.result;
      res(base64Img);
    });
    fileReader.readAsDataURL(file);
  });
};

export default function NewPizzaForm() {
  const form = useForm({
    resolver: yupResolver(newPizzaSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      img: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();

  async function handleSubmit(data, e) {
    const { name, description, price } = data;
    const imgFile = e.target.img.files[0];
    const base64Img = await createBase64Img(imgFile);
    const newPizzaItem = { name, description, price, img: String(base64Img) };
    const jsonPizza = JSON.stringify(newPizzaItem);
    setIsLoading(true);
    try {
      const res = await fetch("/api/pizzas", {
        method: "POST",
        body: jsonPizza,
      });
      console.log(res);
      if (!res.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }
      setMessage({
        status: "ok",
        msg: "Item creado correctamente",
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
    <section>
      <h1>Creación de un nuevo producto</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del producto</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Ingrese el nombre del producto"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Es el nombre que se va a mostrar en el listado de productos
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="resize-none"
                    placeholder="Ingresa una descripción del producto"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ingresa el precio del producto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagen</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Selecciona una imagen que represente al producto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {message && (
            <Alert
              variant={message.status === "error" ? "destructive" : "default"}
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>
                {message.status === "error" ? "Error" : "Ok"}
              </AlertTitle>
              <AlertDescription>
                {message.status === "error"
                  ? "Se ha producido un error al intentar crear el item"
                  : "Item creado correctamente"}
              </AlertDescription>
            </Alert>
          )}
          <div className="flex gap-3">
            <Button type="reset" onClick={() => form.reset()}>
              Limpiar
            </Button>
            <Button disabled={isLoading} type="submit">
              Crear producto
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
