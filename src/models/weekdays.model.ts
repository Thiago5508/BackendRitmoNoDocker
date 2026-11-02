
import { Schema, model } from "mongoose";
import { weekdays } from "../types/weekdays.js";

const routineSchema = new Schema(
  {
    empresaId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    nivel: {
      type: String,
      enum: ["iniciante", "intermediario", "avancado"],
      required: true,
    },

    diasSemana: {
      type: [
        {
          type: String,
          enum: weekdays,
        },
      ],
      required: true,
      validate: {
        validator: (dias: string[]) =>
          dias.length > 0 && new Set(dias).size === dias.length,
        message: "Informe dias válidos e sem duplicidade.",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Uma rotina por nível em cada empresa
routineSchema.index(
  { empresaId: 1, nivel: 1 },
  { unique: true }
);

export const RoutineModel = model("Routine", routineSchema);
