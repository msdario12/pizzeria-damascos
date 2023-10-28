import dbPizzas from "@/utils/db/mongo-client";
import newPizzaSchema from "@/utils/schemas/newPizzaSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const pizzas = await dbPizzas
      .collection("damascos-collection")
      .find({})
      .toArray();
    return NextResponse.json({ pizzas: pizzas, status: "ok" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ text: e });
  }
}

export async function POST(req) {
  try {
    const body = newPizzaSchema.cast(await req.json());
    try {
      await newPizzaSchema.validate(body, { abortEarly: false });
    } catch (e) {
      console.error(e);
      return NextResponse.json({
        status: "error",
        name: e.name,
        errors: e.errors,
      });
    }
    const { name, description, price } = body;
    const newDocument = { name, description, price };

    const result = await dbPizzas
      .collection("damascos-collection")
      .insertOne(newDocument);
    return NextResponse.json({ status: "ok" });
  } catch (e) {
    console.error(e);
    return NextResponse.status(500).json({ error: e, status: "error" });
  }
}
