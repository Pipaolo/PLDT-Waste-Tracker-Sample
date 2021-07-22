import axios from 'axios';
import produce from 'immer';
import { getToken } from 'next-auth/jwt';
import create from 'zustand';
import { hostname } from '../config';
import { ItemPoint, ItemPointDocument } from '../models/item_points';

interface ItemPointsState {
  isLoading: boolean;
  success?: boolean | undefined;
  data: ItemPoint[] | ItemPointDocument[];
  error?: Object;
  createItemPoint: (token: string, itemPoint: ItemPoint) => void;
  deleteItemPoint: (token: string, itemPointID: string) => void;
  editItemPoint: (token: string, updatedItemPoint: ItemPoint) => void;
  getItemPoints: (initialItemPoints: ItemPoint[]) => void;
  reset: () => void;
}

export const useItemPointsStore = create<ItemPointsState>((set, get) => ({
  isLoading: false,
  data: [],
  success: false,
  error: null,
  reset: () => {
    set(
      produce((draft: ItemPointsState) => {
        draft.success = false;
        draft.error = null;
        draft.isLoading = false;
      })
    );
  },
  getItemPoints: (itemPoints) => {
    set(
      produce((draft: ItemPointsState) => {
        draft.data = itemPoints;
      })
    );
  },
  createItemPoint: async (t, itemPoint) => {
    try {
      set({
        isLoading: true,
        error: null,
        success: false,
      });

      await axios.post(`${hostname}/api/admin/pointsManager`, itemPoint, {
        headers: {
          Authorization: 'Bearer ' + t,
        },
      });
      set({
        isLoading: false,
        error: null,
        data: [...get().data, itemPoint],
        success: true,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error,
        success: false,
      });
    }
  },
  editItemPoint: async (t, itemPoint) => {
    try {
      set({
        isLoading: true,
        error: null,
        success: false,
      });
      await axios.patch(
        `${hostname}/api/admin/pointsManager/${itemPoint['_id']}`,
        itemPoint,
        {
          headers: {
            Authorization: 'Bearer ' + t,
          },
        }
      );

      set({
        isLoading: false,
        error: null,
        data: [...get().data, itemPoint],
        success: true,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error,
        success: false,
      });
    }
  },
  deleteItemPoint: async (t, itemPointID) => {
    try {
      const prevItemPoints = get().data;
      set({
        isLoading: true,
        error: null,
        success: false,
      });

      await axios.delete(`${hostname}/api/admin/pointsManager/${itemPointID}`, {
        headers: {
          Authorization: 'Bearer ' + t,
        },
      });

      const itemPoints = prevItemPoints.filter(
        (ip) => ip['_id'] !== itemPointID
      );

      set({
        isLoading: false,
        error: null,
        success: true,
        data: itemPoints,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error,
        success: false,
      });
    }
  },
}));
