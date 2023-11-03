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
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { createBase64Img } from "@/lib/utils";

export default function NewPizzaForm({
  handleSubmit,
  isLoading,
  message,
  form,
}) {
  const [imgSrc, setImgSrc] = useState();
  return (
    <section className="flex">
      <div>
        <img src={imgSrc} alt="Vista previa de la imagen del item a subir." />
      </div>
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
                    // {...field}
                    value={field.value}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      createBase64Img(file).then((res) => setImgSrc(res));
                      field.onChange(e);
                    }}
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
