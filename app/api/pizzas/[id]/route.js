import dbPizzas from "@/utils/db/mongo-client";
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
