import { z } from "zod";

export const formSchema = z.object({
  //   lastname: z.string().min(2, {
  //     message: "Le prénom du dahir doit avoir 2 caractères minimum.",
  //   }),
  //   firstname: z.string().min(2, {
  //     message: "Le nom doit avoir 2 caractères minimum.",
  //   }),
  fullname: z.string().min(5, {
    message: "Le Prénom et le nom doivent avoir 5 caractères minimum.",
  }),
  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "Numéro de téléphone invalide"
    ),
  dahiraname: z.string().min(2, {
    message: "Le nom du dahira doit avoir 2 caractères minimum.",
  }),
  profile: z
    .custom<File[]>()
    .refine(
      (pictures) => pictures.length > 0,
      "Vous devez sélectionner une photo."
    ),
});

export interface Talibe {
  fullname: string;
  phone: string;
  dahiraname: string;
  profile: string;
}

export interface TalibeUser {
  _id: string;
  fullname: string;
  phone: string;
  dahiraname: string;
  profile: string;
  createdAt: Date;
  updatedAt: Date;
}
