import produce from 'immer';
import create from 'zustand';

interface DrawerState {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  reset: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isOpen: false,
  reset: () => {
    set(
      produce((draft: DrawerState) => {
        draft.isOpen = false;
      })
    );
  },
  openDrawer: () => {
    set(
      produce((draft: DrawerState) => {
        draft.isOpen = true;
      })
    );
  },
  closeDrawer: () => {
    set(
      produce((draft: DrawerState) => {
        draft.isOpen = false;
      })
    );
  },
}));
