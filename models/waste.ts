import { Schema, Document, model, models } from "mongoose";

export interface IWaste extends Document {
  batteries: number;
  phones: number;
  chargers: number;
  phoneNumber: string;
}

const WasteSchema: Schema = new Schema<IWaste>({
  batteries: {
    type: Number,
    required: true,
  },
  phones: {
    type: Number,
    required: true,
  },
  chargers: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

WasteSchema.post("save", (error, res, next) => {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("User has an existing waste data"));
  } else {
    next();
  }
});

export default models.Waste || model<IWaste>("Waste", WasteSchema);
