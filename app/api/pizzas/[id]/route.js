import dbPizzas from "@/utils/db/mongo-client";
import newPizzaSchema, {
  updatedPizzaSchema,
} from "@/utils/schemas/newPizzaSchema";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const id = params.id;
    const query = { _id: new ObjectId(id) };
    const result = await dbPizzas
      .collection("damascos-collection")
      .deleteOne(query);
    if (result.deletedCount === 1) {
      const msg = "Successfully deleted one document.";
      console.log(msg);
      return NextResponse.json({ status: "ok", msg: msg });
    } else {
      const msg =
        "No documents matched the query. Deleted 0 documents with the id ";
      console.log(msg);
      return NextResponse.json({ status: "ok", msg: msg });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.status(500).json({ error: e, status: "error" });
  }
}

export async function PUT(req, { params }) {
  try {
    const id = params.id;
    const body = updatedPizzaSchema.cast(await req.json());
    try {
      await updatedPizzaSchema.validate(body, { abortEarly: false });
    } catch (e) {
      return NextResponse.json({
        status: "error",
        name: e.name,
        errors: e.errors,
      });
    }
    const filter = { _id: new ObjectId(id) };
    const updatedDoc = {
      $set: body,
    };
    const result = await dbPizzas
      .collection("damascos-collection")
      .findOneAndUpdate(filter, updatedDoc);
    console.log(result);
    return NextResponse.json({ status: "ok", msg: "Actualizcion correcta." });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e, status: "error" });
  }
}
