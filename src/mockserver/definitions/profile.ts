import * as _ from 'lodash';
import {Gender, Profile as baseProfile, Title} from '../../shared-definitions/Profile';
import {Id, WithId} from './withId';
import {DefaultResolver, FakeData} from '../helper';
import {User} from './user';

export interface Profile extends baseProfile, WithId {}

export const resolver = (fakeData: FakeData): DefaultResolver => (parent: User) =>
  _.find(fakeData.profiles, ['id', parent.profileId]) ?? null;

export const createProfile =
  (id: Id, firstname: string, name: string, phone: string = '', gender: Gender = Gender.NA, title: Title = Title.NONE): Profile =>
    ({
      id,
      firstname,
      name,
      phone,
      gender,
      title
    });

export const typeDef = `
  enum Gender {
    NA,
    FEMALE,
    MALE
  }

  type Profile {
    id: Int!
    firstname: String!
    name: String!
    phone: String!
    gender: Gender!
    title: String!
  }
`;
