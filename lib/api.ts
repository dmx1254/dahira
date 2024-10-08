import { connectDB } from "./db";
import TalibeModel from "./model";
import { parseStringify } from "./utils";
import { Talibe } from "./validation";

import { unstable_noStore as noStore } from "next/cache";

connectDB();

export async function createTalibe(talibe: Talibe) {
  try {
    const isPhoneExist = await TalibeModel.findOne({ phone: talibe.phone });
    if (isPhoneExist)
      return {
        error: "Ce numéro de téléphone existe déjà",
        user: {},
        message: "",
      };

    const savedUser = await TalibeModel.create(talibe);
    const newuser = parseStringify(savedUser);
    return {
      error: "",
      user: newuser,
      message: "Merci pour votre inscription ! Bienvenue parmi nous.",
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getAllTalibes() {
  try {
    const talibes = await TalibeModel.find().sort({ createdAt: 1 });
    return talibes;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getTalibesAndTotalPages(
  query: string,
  currentPage: number,
  dahiraname: string
) {
  noStore();
  let itemsPerPage: number = 10;
  const offset = (currentPage - 1) * itemsPerPage;

  const matchConditions: any = {};

  // Ajouter une condition pour le titre s'il est spécifié
  if (query && query.trim() !== "") {
    matchConditions.fullname = { $regex: query, $options: "i" };
  }

  // Ajouter une condition pour la catégorie si elle est spécifiée
  if (dahiraname && dahiraname.trim() !== "") {
    matchConditions.dahiraname = dahiraname;
  }

  try {
    // Récupérer le nombre total de documents
    const totalDocuments = await TalibeModel.countDocuments(matchConditions);

    // Calculer le nombre total de pages
    const totalPages = Math.ceil(totalDocuments / itemsPerPage);

    // Récupérer les articles correspondants aux critères de filtrage avec pagination
    const talibes = await TalibeModel.aggregate([
      {
        $match: matchConditions,
      },
      {
        $sort: { createdAt: 1 },
      },
      {
        $skip: offset,
      },
      {
        $limit: itemsPerPage,
      },
    ]);

    return {
      talibes: JSON.parse(JSON.stringify(talibes)),
      totalPages,
    };
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getDahiraNames() {
  noStore();

  try {
    const dahiranames = await TalibeModel.find().select("dahiraname");
    const dahiras = JSON.parse(JSON.stringify(dahiranames));
    const uniqueDahiraNames = [
      ...new Set(dahiras.map((dahira) => dahira.dahiraname)),
    ];
    return uniqueDahiraNames;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteOneTalibe(talibeId: string) {
  try {
    const talibeDeleted = await TalibeModel.findByIdAndDelete(talibeId);
    return JSON.parse(JSON.stringify(talibeDeleted));
  } catch (error: any) {
    throw new Error(error);
  }
}
