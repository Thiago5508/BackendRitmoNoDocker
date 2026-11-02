import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    empresaId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
    superiorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    nome: {
      type: String,
      required: true,
      trim: true,
    },

    isProfessor: {
      type: Boolean,
      required: true,
    },

    nivel: {
      type: String,
      enum: ["iniciante", "intermediario", "avancado"],
      required: true,
    },

    telefone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    senha: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.index(
//   { empresaId: 1, telefone: 1 },
//   { unique: true }
// );

export const UserModel = model("User", userSchema);