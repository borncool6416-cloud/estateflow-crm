export enum TransactionType {
  SALE = 'Sale',
  RENT = 'Rent'
}

export enum UnitStatus {
  NEW = 'New',
  USED = 'Used',
  FINISHED = 'Finished',
  UNFINISHED = 'Unfinished'
}

export interface ClientDetails {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

export interface PropertyDetails {
  location: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  transactionType: TransactionType;
}

export interface ClientRequest {
  id: string;
  client: ClientDetails;
  property: PropertyDetails;
  targetBudget: number;
  date: string;
}

export interface PropertyListing {
  id: string;
  client: ClientDetails;
  property: PropertyDetails;
  askingPrice: number;
  status: UnitStatus;
  date: string;
}

export interface Match {
  requestId: string;
  listingId: string;
  matchScore: number;
  requestClient: string;
  listingAddress: string;
}
