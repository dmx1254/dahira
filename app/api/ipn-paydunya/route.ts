import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (request.method === "POST") {
    try {
      const notification = request.body;
      return NextResponse.json(notification, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
