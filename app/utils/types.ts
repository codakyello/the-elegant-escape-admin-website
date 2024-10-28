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
  maxCapacity: number;
  discount: number;
  image: string;
  description: string;
  regularPrice: number;
}

export interface CabinData {
  name: string;
  maxCapacity: number;
  discount: number;
  image: string | undefined;
  regularPrice: number;
  description: string;
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

export interface BookingData {
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
