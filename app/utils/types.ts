export type Filter = {
  name: string;
  value: string; // You can modify this depending on what type value is
};

export interface Guest {
  fullName: string;
  email: string;
}

export interface Cabin {
  _id: string;
  name: string;
  numGuests: number;
  totalPrice: number;
  discount: number;
  image: string;
  regularPrice: number;
}

export interface Booking {
  _id: string;
  startDate: Date;
  endDate: Date;
  numNights: number;
  totalPrice: number;
  status: string;
  guest: Guest;
  cabin: Cabin;
}

export type BookingRowProps = {
  booking?: Booking;
  cabin?: Cabin;
};
