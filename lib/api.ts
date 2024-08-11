import { connectDB } from "./db";
import TalibeModel from "./model";
import { parseStringify } from "./utils";
import { Talibe } from "./validation";

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
