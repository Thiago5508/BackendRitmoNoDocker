import { Schema, model } from "mongoose";

const EventSchema = new Schema(
  {
    empresaId: {
      type: Schema.Types.ObjectId,
      ref: "Empresa",
      required: true,
      index: true,
    },

    data: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
    },

    hora: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },

    local: {
      type: String,
      required: true,
      trim: true,
    },

    descricao: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

EventSchema.index({ empresaId: 1, data: 1, hora: 1 });

const EventModel = model("Event", EventSchema);

export default EventModel;