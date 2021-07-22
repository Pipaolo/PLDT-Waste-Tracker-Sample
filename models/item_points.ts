import { Document, Schema, model, models, Model } from 'mongoose';

export interface ItemPoint {
  points: number;
  name: string;
}

export interface ItemPointDocument extends ItemPoint, Document {}

export interface ItemPointModel extends Model<ItemPointDocument> {}

const ItemPointSchema: Schema<ItemPointDocument, ItemPointModel> = new Schema<
  ItemPointDocument,
  ItemPointModel
>(
  {
    name: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default (models.ItemPoint as ItemPointModel) ||
  model<ItemPointDocument, ItemPointModel>('ItemPoint', ItemPointSchema);
