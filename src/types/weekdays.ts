export const weekdays = [
  "SEG",
  "TER",
  "QUA",
  "QUI",
  "SEX",
  "SAB",
  "DOM",
] as const;

export type DiaSemana = (typeof weekdays)[number];