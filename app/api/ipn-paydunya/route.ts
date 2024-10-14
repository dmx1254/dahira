import { NextResponse } from "next/server";
import CotisationModel from "@/lib/cotisationModel";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const notification: any = {};
    formData.forEach((value, key) => {
      notification[key] = value;
    });

    await CotisationModel.create(notification);

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}