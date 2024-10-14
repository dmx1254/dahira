import { NextResponse } from "next/server";

import CotisationModel from "@/lib/cotisationModel";

export async function POST(request: Request) {
  if (request.method === "POST") {
    try {
      const notification = await request.json();
      await CotisationModel.create(notification);
    return NextResponse.json(notification, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
