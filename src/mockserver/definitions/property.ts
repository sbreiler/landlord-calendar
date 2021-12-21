import * as _ from 'lodash';
import {DefaultResolver, FakeData} from '../helper';
import {Address} from './address';
import {User} from './user';
import {Appointment} from './appointment';
import {Property as baseProperty} from '../../shared-definitions/Property';
import { Id, WithId } from './withId';


export interface Property extends baseProperty, WithId {
  addressId: Id;
  userId: Id;
}

export const resolver = (fakeData: FakeData): DefaultResolver => (parent: Appointment) =>
  _.find(fakeData.properties, ['id', parent.propertyId]) ?? null;

export const createProperty =
  (id: Id, name: string, inviteeCount: number, address: Address, user: User, attachments: string[] = []): Property =>
    ({
      id,
      name,
      inviteeCount,
      addressId: address.id,
      attachments,
      userId: user.id
    });

// ignoring attachments here:
export const typeDef = `
  type Property {
    id: Int!
    name: String!
    inviteeCount: Int!
    address: Address!
    attachments: [String]
    user: User!
  }
`;
