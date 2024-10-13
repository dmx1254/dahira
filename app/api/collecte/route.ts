import { setup } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const dataReq = await request.json();
  const data = {
    invoice: {
      total_amount: dataReq.amount,
      description:
        "Le Dahira KONU est une association religieuse islamique à but non lucratif, rassemblant",
    },
    store: {
      name: "Collecte Dahira KONU",
      logo_url: "https://dahira-thierno-cheikh-talll.vercel.app/logo.jpeg",
      website_url: "https://dahira-thierno-cheikh-talll.vercel.app/",
    },
    actions: {
      callback_url:
        "https://dahira-thierno-cheikh-talll.vercel.app/api/ipn-collecte",
    },
  };

  try {
    const response = await fetch(`${process.env.PAYDUNYA_API_URL}`, {
      method: "POST",
      headers: setup,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return NextResponse.json({
        message: `HTTP error! Status: ${response.status}`,
      });
    }

    const responseData = await response.json();
    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
