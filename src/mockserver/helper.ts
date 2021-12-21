import {typeDefs as scalarTypeDefs, resolvers as scalarResolvers} from 'graphql-scalars';
import {GraphQLFieldResolver} from 'graphql/type';
import {IResolvers} from '@graphql-tools/utils/Interfaces';
import * as moment from 'moment';
import * as _ from 'lodash';
import {Appointment, createAppointment, resolvers as appointmentResolvers, typeDef as appointmentTypeDef} from './definitions/appointment';
import {
  Contact,
  AnonymousContact,
  resolver as contactResolver,
  typeDef as contactTypeDef,
  createContact
} from './definitions/contact';
import {createProperty, Property, resolver as propertyResolver, typeDef as propertyTypeDef} from './definitions/property';
import {Address, createAddress, resolver as addressResolver, Country, typeDef as addressTypeDef} from './definitions/address';
import {User, createUser, resolver as userResolver, typeDef as userTypeDef} from './definitions/user';
import {Profile, createProfile, resolver as profileResolver, typeDef as profileTypeDef} from './definitions/profile';

export type DefaultResolver = GraphQLFieldResolver<any, object>; // => Parent, Args
export type FakeData = {
  appointments: Appointment[],
  contacts: Contact[],
  properties: Property[],
  addresses: Address[],
  users: User[],
  profiles: Profile[]
};

export const createTypeDefs = (...typeDefs: string[]): string[] => [
  ...scalarTypeDefs,
  ...typeDefs,
  `type Query {
    appointment(id: Int!): Appointment,
    appointments(start: DateTime!, end: DateTime!): [Appointment]
  }`
];

export const allTypeDefs = [
  appointmentTypeDef,
  contactTypeDef,
  propertyTypeDef,
  addressTypeDef,
  userTypeDef,
  profileTypeDef
];

export const createResolvers = (fakeData: FakeData): IResolvers => {
  const appointmentResolver = appointmentResolvers(fakeData);

  return {
    // we could set all resolvers with `...scalarResolvers`, but we pick only needed for now:
    Date: scalarResolvers.Date,
    DateTime: scalarResolvers.DateTime,

    Query: {
      appointment: appointmentResolver.byId,
      appointments: appointmentResolver.betweenDates
    },
    Appointment: {
      property: propertyResolver(fakeData),
      contact: contactResolver(fakeData)
    },
    Property: {
      user: userResolver(fakeData),
      address: addressResolver(fakeData)
    },
    User: {
      profile: profileResolver(fakeData)
    },
    Contact: {
      address: addressResolver(fakeData)
    }
  };
};

export const createFakeData = (): FakeData => { // big ugly function coming up - you've been warned!
  const randomId = () => _.random(111111, 999999);

  const appointments: Appointment[] = [];
  const contacts: Contact[] = [];
  const properties: Property[] = [];
  const addresses: Address[] = [];
  const users: User[] = [];
  const profiles: Profile[] = [];

  profiles.push( // only one profile provided in sample data
    createProfile( // from example data.json
      randomId(),
      'Max',
      'Mustermann',
    ),
    createProfile(
      randomId(),
      'Annemarie',
      'Reiners',
    ),
    createProfile(
      randomId(),
      'Hans-Jürgen',
      'Langenfeld',
    ),
    createProfile(
      randomId(),
      'Frieda',
      'Weidenhaupt',
    )
  );

  users.push(..._.map(profiles, profile => createUser(randomId(), profile)));

  addresses.push(
    createAddress( // from example data.json
      randomId(),
      'Karlhagenbeckstr',
      '31',
      '39576',
      'Stendal'
    ),
    createAddress( // from example data.json
      randomId(),
      'Lazarettstr.',
      '3',
      '80636',
      'München'
    ),
    createAddress(
      randomId(),
      'Kornblumenweg',
      '4',
      '26655',
      'Westerstede'
    ),
    createAddress(
      randomId(),
      'Grimm',
      '12',
      '20457',
      'Hamburg'
    )
  );

  properties.push(
    createProperty( // from example data.json
      2442379,
      '2 Zimmer in Stendal',
      2,
      addresses[0],
      users[0]
    ),
    createProperty( // from example data.json
      2440848,
      'Test',
      1,
      addresses[1],
      users[0]
    ),
    createProperty( // from example data.json
      2440850,
      'Flat ohne name',
      1,
      addresses[1],
      users[0]
    ),
    createProperty(
      randomId(),
      'Haus an Straße',
      2,
      addresses[2],
      users[1]
    ),
    createProperty(
      randomId(),
      'Immomio GmbH',
      2,
      addresses[3],
      users[2]
    )
  );

  contacts.push( // only an empty contact
    AnonymousContact,
    createContact(
      randomId(),
      'Fabian',
      'Patz'
    ),
    createContact(
      randomId(),
      'Natascha',
      'Leiderman'
    )
  );

  appointments.push(
    createAppointment( // from example data.json
      2442449,
      moment('2019-03-09T11:00:00.000+0000'),
      3,
      2,
      contacts[0],
      properties[0]
    ),
    createAppointment( // from example data.json
      2442150,
      moment('2019-02-27T11:00:00.000+0000'),
      2,
      1,
      contacts[0],
      properties[1]
    ),
    createAppointment( // from example data.json
      2442901,
      moment('2019-02-28T11:00:00.000+0000'),
      3,
      1,
      contacts[0],
      properties[2]
    ),
    createAppointment(
      randomId(),
      moment().add(1, 'd').hour(14).minute(0).second(0),
      2,
      1,
      contacts[1],
      properties[4],
      true
    ),
    createAppointment(
      randomId(),
      moment().add(1, 'd').hour(13).minute(0).second(0),
      2,
      2,
      contacts[2],
      properties[3],
      true
    ),
    createAppointment(
      randomId(),
      moment().hour(12).minute(0).second(0),
      3,
      1,
      contacts[1],
      properties[4],
      true
    ),
    createAppointment(
      randomId(),
      moment().hour(16).minute(0).second(0),
      4,
      2,
      contacts[2],
      properties[3],
      true
    ),
  );

  return {
    appointments,
    contacts,
    properties,
    users,
    addresses,
    profiles
  };
};
