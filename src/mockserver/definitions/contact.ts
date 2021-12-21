import * as _ from 'lodash';
import {Contact as baseContact} from '../../shared-definitions/Contact';
import {Id, OptionalId, WithId} from './withId';
import {DefaultResolver, FakeData} from '../helper';
import {Appointment} from './appointment';
import {Address} from './address';

export interface Contact extends baseContact, WithId {
  addressId: OptionalId;
}

export const resolver = (fakeData: FakeData): DefaultResolver => (parent: Appointment) =>
  _.find(fakeData.contacts, ['id', parent.contactId]) ?? null;

export const createContact = (
  id: Id,
  firstName: string,
  name: string,
  email: string = '',
  mobile: string = '',
  phone: string = '',
  address: Address|null = null,
  fullName: string = ''
): Contact => ({
  id,
  firstName,
  name,
  email,
  mobile,
  phone,
  addressId: _.isNil(address) ? null : address.id,
  fullName
});

export const AnonymousContact: Contact = createContact(
  999999,
  '',
  '',
  '',
  '',
  ''
);

export const typeDef = `
  type Contact {
    id: Int!
    firstName: String!
    name: String!
    email: String!
    mobile: String!
    phone: String!
    address: Address
    fullName: String!
  }
`;
