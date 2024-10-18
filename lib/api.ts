import CotisationModel from "./cotisationModel";
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

  if (query && query.trim() !== "") {
    matchConditions.fullname = { $regex: query, $options: "i" };
  }

  if (dahiraname && dahiraname.trim() !== "") {
    matchConditions.dahiraname = dahiraname;
  }

  try {
    const totalDocuments = await TalibeModel.countDocuments(matchConditions);
    const totalPages = Math.ceil(totalDocuments / itemsPerPage);

    const talibes = await TalibeModel.aggregate([
      // {
      //   $sort: { createdAt: 1 },
      // },
      {
        $match: matchConditions,
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
    console.error("Error in getTalibesAndTotalPages:", error);
    throw new Error(`Failed to fetch talibes: ${error.message}`);
  }
}

export async function getDahiraNames() {
  noStore();

  try {
    const dahiranames = await TalibeModel.distinct("dahiraname");
    const dahiras = JSON.parse(JSON.stringify(dahiranames));
    return dahiras;
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

export async function checkIsTalibeValid(talibeId: string) {
  try {
    const talibe = await TalibeModel.findOne({ _id: talibeId })
      .select("_id")
      .select("fullname");
    return JSON.parse(JSON.stringify(talibe));
  } catch (error: any) {
    throw new Error(error);
  }
}
