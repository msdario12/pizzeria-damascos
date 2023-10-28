import dbPizzas from "@/utils/db/mongo-client";
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
    // Get
    // const body = JSON.parse(req.body);
    const body = await req.json();
    console.log("body", body);
    const newDocument = { name: body.name, description: body.description };

    const result = await dbPizzas
      .collection("damascos-collection")
      .insertOne(newDocument);
    return NextResponse.json({ status: "ok" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e });
  }
}
