export enum Country {
  DE = 'DE'
}

export interface Address {
  street: string;
  houseNumber: string;
  city: string;
  country: Country;
  zipCode: string;
}
