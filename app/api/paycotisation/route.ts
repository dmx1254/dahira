import { headersKey } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = {
    invoice: {
      total_amount: 1000,
      description:
        "Cotisation mensuelle du dahira Konu Cheikh Oumar Foutiyou Tall",
    },
    store: {
      name: "Konu Cheikh Oumar Foutiyou Tall",
      logo_url:
        "https://dahira-thierno-cheikh-talll.vercel.app/images/logo.jpeg",
    },
  };

  try {
    const response = await fetch(`${process.env.PAYDUNYA_API_URL}`, {
      method: "POST",
      headers: headersKey,
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
