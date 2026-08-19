import { Schema, model } from "mongoose";

const companySchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CompanyModel = model("Company", companySchema);