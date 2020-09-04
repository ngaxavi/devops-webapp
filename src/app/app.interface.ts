export interface Occupant {
  _id?: string;
  name: string;
  flat: string;
  moveInDate: Date;
  moveOutDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Device {
  _id?: string;
  name: string;
  deviceId: string;
  flatId: string;
  roomNr: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Building {
  _id?: string;
  name: string;
  address: string;
  nbOfFloor: number;
  flats: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Flat {
  _id?: string;
  flatId: string;
  building: string;
  rooms: number[];
  occupied: boolean;
  buildingName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AddEditBuildingData {
  title: string;
  name: string;
  address: string;
  nbOfFloor: number;
}

export interface AddEditFlatData {
  title: string;
  buildings: Building[];
  building: string;
  flatId: string;
}

export interface AddEditOccupantData {
  title: string;
  name: string;
  flat: string;
  moveInDate: Date;
  moveOutDate: Date;
  flats: Flat[];
}

export interface EditDeviceData {
  name: string;
  deviceId: string;
}

export interface DeleteData {
  title: string;
  name: string;
}

export interface MeasurementValue {
  timestamp: string;
  temperature: number;
  meterValue: number;
}

export interface OccupantBilling {
  occupant: Occupant;
  address: string;
  billings: Billing[];
}

export interface Billing {
  roomNr: number;
  minMeterValue: number;
  maxMeterValue: number;
  billingValue: number;
}
