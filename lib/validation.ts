import { z } from "zod";

export const formSchema = z.object({
  fullname: z
    .string()
    .min(5, {
      message: "Le Prénom et le nom doivent avoir 5 caractères minimum.",
    })
    .toLowerCase(),
  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "Numéro de téléphone invalide"
    ),
  dahiraname: z
    .string()
    .min(2, {
      message: "Le nom du dahira doit avoir 2 caractères minimum.",
    })
    .toLowerCase(),
  profile: z
    .custom<File[]>()
    .refine(
      (pictures) => pictures.length > 0,
      "Vous devez sélectionner une photo."
    ),
});

export const loginFormSchema = z.object({
  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "Numéro de téléphone invalide"
    ),
  password: z
    .string()
    .min(8, "Le mot de passe doit avoir au moins 8 caractères")
    .regex(
      /[!@#$%^&*()-+=;]/,
      "Le mot de passe doit contenir au moins un caractère spécial"
    ),
});

export interface Talibe {
  fullname: string;
  phone: string;
  dahiraname: string;
  profile: string;
}
export interface LoginTalibe {
  phone: string;
  password: string;
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

export interface TalibeCkeck {
  _id: string;
  fullname: string;
}
