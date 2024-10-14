import { NextResponse } from "next/server";
import CotisationModel from "@/lib/cotisationModel";

export async function POST(request: Request) {
  try {
    // Parse formData, assuming that the request contains form-data
    const formData = await request.formData();

    // Convert formData to a regular object
    const notification: any = {};
    formData.forEach((value, key) => {
      notification[key] = value;
    });

    // Create a new entry in the database
    await CotisationModel.create(notification);

    // Respond with the received notification
    return NextResponse.json({test: "testing ping"}, { status: 200 });
  } catch (error: any) {
    // Handle errors and return a 500 response if something goes wrong
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}