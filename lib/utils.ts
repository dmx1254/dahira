import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result as string; // Cast result to string
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertDate = (date: Date) => {
  const convertedDate = new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return convertedDate;
};

export const pagination = (currentPage: number, totalPages: number) => {
  if (currentPage <= 7 && totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage > totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const headersKey: HEADER_KEY = {
  "Content-Type": "application/json",
  "PAYDUNYA-MASTER-KEY": process.env.PAYDUNYA_MASTER_KEYS!,
  "PAYDUNYA-PRIVATE-KEY": process.env.PAYDUNYA_PRIVATE_KEY!,
  "PAYDUNYA-TOKEN": process.env.PAYDUNYA_TOKEN!,
};

interface HEADER_KEY {
  [key: string]: string;
}

export const setup: HEADER_KEY = {
  "Content-Type": "application/json",
  "PAYDUNYA-MASTER-KEY": process.env.MASTER_COLLECTE_KEY!,
  "PAYDUNYA-PRIVATE-KEY": process.env.PRIVATE_COLLECTE_KEY!,
  "PAYDUNYA-TOKEN": process.env.TOKEN_COLLECTE!,
};

export const dahirasName = [
  "jaxaay 1",
  "jaxaay 2",
  "kounoune",
  "darou thioube",
  "el hadji pathe",
  "niague wolof",
  "asecna yeumbeul",
  "darou-rahmane",
  "gadaye",
  "ouakam",
  "serigne-assane-guediawaye",
  "cheikh-wade-guediawaye",
  "gouye-fatou-maiga",
  "golf",
  "gounass",
  "niatty mbarre",
  "leona-thiaroye",
  "pikine-rue 10",
  "gounass station-touré",
];
