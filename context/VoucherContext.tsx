'use client'

import React, { createContext, useContext, useState } from 'react'

interface TravelDetail {
  type: string;
  date: string;
  description: string;
}

interface RoomDetail {
  confNo: string;
  hotelName: string;
  address: string;
  startDate: string;
  endDate: string;
  roomType: string;
  noOfRooms: string;
}

interface ItineraryItem {
  day: string;
  date: string;
  schedule: string;
  description: string;
}

interface VoucherData {
  guestName: string;
  adults: number;
  children: number;
  childrenAges: string;
  voucherDate: string;
  travelDetails: TravelDetail[];
  roomDetails: RoomDetail[];
  inclusions: string;
  emergencyContact: string;
  airportMeeting: string;
  guestList: string;
  itinerary: ItineraryItem[];
  notes: string;
}

interface VoucherContextType {
  voucherData: VoucherData;
  setVoucherData: React.Dispatch<React.SetStateAction<VoucherData>>;
}

const VoucherContext = createContext<VoucherContextType | undefined>(undefined);

export const useVoucher = () => {
  const context = useContext(VoucherContext);
  if (context === undefined) {
    throw new Error('useVoucher must be used within a VoucherProvider');
  }
  return context;
};

export const VoucherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [voucherData, setVoucherData] = useState<VoucherData>({
    guestName: '',
    adults: 1,
    children: 0,
    childrenAges: '',
    voucherDate: '',
    travelDetails: [],
    roomDetails: [],
    inclusions: '',
    emergencyContact: '',
    airportMeeting: '',
    guestList: '',
    itinerary: [],
    notes: ''
  });

  return (
    <VoucherContext.Provider value={{ voucherData, setVoucherData }}>
      {children}
    </VoucherContext.Provider>
  );
};

