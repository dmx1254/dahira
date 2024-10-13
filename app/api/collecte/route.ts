import { NextResponse } from "next/server";
const paydunya = require("paydunya");

const setup = new paydunya.Setup({
  masterKey: process.env.MASTER_COLLECTE_KEY,
  privateKey: process.env.PRIVATE_COLLECTE_KEY,
  publicKey: process.env.PUBLIC_COLLECTE_KEY,
  token: process.env.TOKEN_COLLECTE,
  mode: "live",
});

const store = new paydunya.Store({
  name: "Collecte Dahira KONU", // Seul le nom est requis
  // tagline: "L'élégance n'a pas de prix",
  // phoneNumber: '336530583',
  // postalAddress: 'Dakar Plateau - Etablissement kheweul',
  websiteURL: "https://dahira-thierno-cheikh-talll.vercel.app/",
  logoURL: "https://dahira-thierno-cheikh-talll.vercel.app/.jpeg",
});

export async function POST(request: Request) {
  try {
    const invoice = new paydunya.CheckoutInvoice(setup, store);
    invoice.description = `Le Dahira KONU est une association religieuse islamique à but non lucratif, rassemblant 
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
    `;
    invoice.totalAmount = 1500;
    const data = await invoice.create();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
