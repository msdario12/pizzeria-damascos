"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, X } from "lucide-react";
import DeleteDialogConfirm from "./components/DeleteDialogConfirm";
import EditPizzaDialog from "./components/EditPizzaDialog";

export const columns = [
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "description", header: "Descripción" },
  { accessorKey: "price", header: "Price" },
  {
    accessorKey: "img",
    header: "Imagen",
    cell: (row) => {
      return (
        <img
          className="w-8"
          src={
            row.row.original.img
              ? row.row.original.img
              : "https://placehold.co/200x200.png"
          }
          alt="Test"
        />
      );
    },
  },
  {
    accessorKey: "_id",
    header: "Acciones",
    cell: (row) => {
      const id = row.getValue("_id");
      const data = row.row.original;
      return (
        <div className="flex gap-2">
          <EditPizzaDialog data={data} id={id} />
          <DeleteDialogConfirm id={id} />
        </div>
      );
    },
  },
];
