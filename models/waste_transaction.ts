import { Schema, Document, model, models, Model } from 'mongoose';
import { WatchObserver } from 'react-hook-form';

export interface WasteTransaction {
  batteries: number;
  phones: number;
  chargers: number;
  phoneNumber: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface WasteTransactionDocument extends WasteTransaction, Document {}

export interface WasteTransactionModel
  extends Model<WasteTransactionDocument> {}

const WasteTransaction: Schema = new Schema<
  WasteTransactionDocument,
  WasteTransactionModel
>(
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

export default (models.WasteTransaction as WasteTransactionModel) ||
  model<WasteTransactionDocument, WasteTransactionModel>(
    'WasteTransaction',
    WasteTransaction,
    'waste_transaction'
  );
