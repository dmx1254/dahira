"use server";

import { revalidatePath } from "next/cache";
import { createTalibe, deleteOneTalibe, getAllTalibes } from "./api";
import { parseStringify } from "./utils";
import { Talibe } from "./validation";

export const registerTalibe = async (talibe: Talibe) => {
  try {
    const response = await createTalibe(talibe);
    if (response.error) {
      // throw new Error(response.error);
      return response
    } else {
      return parseStringify(response);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getTalibes = async () => {
  try {
    const talibes = await getAllTalibes();
    return parseStringify(talibes);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTalibe = async (talibeId: string) => {
  try {
    const talibeDeleted = await deleteOneTalibe(talibeId);
    if (talibeDeleted) {
      revalidatePath("/dahira/admin");
    }
  } catch (error) {
    console.log(error);
  }
};





