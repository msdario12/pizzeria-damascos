import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    const db = client.db("damascos-pizzas");

    const pizzas = await db
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
  } catch (e) {
    console.error(e);
  }
}
