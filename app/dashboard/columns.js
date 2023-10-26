"use client";
import { ColumnDef } from "@tanstack/react-table";

export const columns = [
  { accessorKey: "name", header: "Nombre" },
  { accessorKey: "description", header: "Descripción" },
  { accessorKey: "price", header: "Price" },
  { accessorKey: "img", header: "Imagen" },
];
