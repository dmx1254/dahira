import { setup } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = {
    invoice: {
      total_amount: 1000,
      description: `Le Dahira KONU est une association religieuse islamique à but non lucratif, rassemblant 
      hommes, femmes, et surtout des jeunes, qui œuvrent avec dévouement et conviction 
      pour la promotion de l’islam, la Sunnah du Prophète Seydina Mouhamad (PSL), ainsi 
      que les enseignements de Cheikh Oumar Al Foutiyou Tall, figure emblématique de 
      l’expansion de l’islam et de la Tariqa Tidjane en Afrique noire. Cette œuvre se déroule 
      sous la direction et la bénédiction de leur guide spirituel, Cheikh Oumar ibn Thierno 
      Mouhamadoul Bachir Tall, digne continuateur de l’héritage de son illustre grand-père 
      et homonyme, El Hadji Oumar Al Foutiyou Tall.: Atteindre un objectif de 5 millions de francs CFA pour 
      financer les activités au sein des dahiras, et acquérir des produits tels que du sucre, 
      du riz, et de l’huile pour les revendre au sein des dahiras. Cela inclut également le 
      soutien à l’agriculture et la promotion de la participation numérique du KONU via le 
      lancement d'un Hackathon dédié à un développement digital au service du Dahira.
      `,
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
