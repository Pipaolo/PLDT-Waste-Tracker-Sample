import { Schema, Document, model, models } from "mongoose";

export interface IWasteTransaction extends Document {
  batteries: number;
  phones: number;
  chargers: number;
  phoneNumber: string;
}

const WasteTransaction: Schema = new Schema<IWasteTransaction>(
  {
    batteries: {
      type: Number,
      default: 0,
    },
    phones: {
      type: Number,
      default: 0,
    },
    chargers: {
      type: Number,
      default: 0,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.WasteTransaction ||
  model<IWasteTransaction>(
    "WasteTransaction",
    WasteTransaction,
    "waste_transaction"
  );
