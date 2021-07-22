import axios from 'axios';
import moment from 'moment';
import create from 'zustand';
import { hostname } from '../config';
import { WasteTransaction } from '../models/waste_transaction';
import { APIResponse } from '../types/api_response';

interface WasteTransactionState {
  isLoading: boolean;
  data?: WasteTransaction[];
  error?: Object;
  success?: boolean;
  getWasteTransactions: (token: string) => void;
}

export const useWasteTransactionsStore = create<WasteTransactionState>(
  (set) => ({
    isLoading: false,
    data: [],
    error: null,
    success: null,
    getWasteTransactions: async (t) => {
      try {
        set({
          isLoading: true,
          error: null,
          success: false,
        });

        const response = await axios.get<APIResponse>(
          `${hostname}/api/admin/transactions`,
          {
            headers: {
              Authorization: 'Bearer ' + t,
            },
          }
        );

        const parsedTransactions = response.data.data.map((t) => ({
          ...t,
          createdAt: moment(t.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
        }));
        set({
          isLoading: false,
          data: parsedTransactions,
          error: null,
          success: true,
        });
      } catch (error) {
        set({
          isLoading: false,
          data: [],
          error,
          success: false,
        });
      }
    },
  })
);
