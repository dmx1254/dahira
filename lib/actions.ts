"use server";

import { createTalibe } from "./api";
import { parseStringify } from "./utils";
import { Talibe } from "./validation";

export const registerTalibe = async (talibe: Talibe) => {
  try {
    const response = await createTalibe(talibe);
    if (response.error) {
      throw new Error(response.error);
    } else {
      return parseStringify(response);
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
