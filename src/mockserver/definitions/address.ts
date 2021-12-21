import * as _ from 'lodash';
import {Address as baseAddress, Country} from '../../shared-definitions/Address';
import {Id, WithId} from './withId';
import {DefaultResolver, FakeData} from '../helper';
import {Contact} from './contact';
import {Property} from './property';

export interface Address extends baseAddress, WithId {}

export const resolver = (fakeData: FakeData): DefaultResolver => (parent: Contact|Property) =>
  _.find(fakeData.addresses, ['id', parent.addressId]) ?? null;

export {Country} from '../../shared-definitions/Address';

export const createAddress =
  (id: Id, street: string, houseNumber: string, zipCode: string, city: string, country: Country = Country.DE): Address =>
    ({
      id,
      street,
      houseNumber,
      city,
      country,
      zipCode
    });

export const typeDef = `
  enum Country {
    DE
  }

  type Address {
    id: Int!
    street: String!
    houseNumber: String!
    city: String!
    country: Country!
    zipCode: String!
  }
`;
