
import { create } from 'zustand';

interface BookingState {
  roomId: string | null;
  checkInDate: Date | undefined | null;
  checkOutDate: Date | undefined | null;
  numberOfGuests: number;
  addOns: { [key: string]: number };
  setBookingDetails: (details: Partial<BookingState>) => void;
  resetBooking: () => void;
}

const initialState = {
  roomId: null,
  checkInDate: null,
  checkOutDate: null,
  numberOfGuests: 1,
  addOns: {},
};

export const useBookingStore = create<BookingState>()((set) => ({
  ...initialState,
  setBookingDetails: (details) => set((state) => ({ ...state, ...details })),
  resetBooking: () => set(initialState),
}));
