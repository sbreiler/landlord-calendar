import * as _ from 'lodash';
import {User as baseUser, UserType} from '../../shared-definitions/User';
import { Id, WithId } from './withId';
import {Profile} from './profile';
import {DefaultResolver, FakeData} from '../helper';
import {Property} from './property';

export interface User extends baseUser, WithId {
  profileId: Id;
}

export const resolver = (fakeData: FakeData): DefaultResolver => (parent: Property) =>
  _.find(fakeData.users, ['id', parent.userId]) ?? null;

export const createUser =
  (id: Id, profile: Profile, usertype = UserType.COMPANYADMIN): User =>
    ({
      id,
      profileId: profile.id,
      usertype
    });

export const typeDef = `
  enum Usertype {
    COMPANYADMIN
  }

  type User {
    id: Int!
    profile: Profile!
    usertype: Usertype!
  }
`;
