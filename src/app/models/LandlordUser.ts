import {Profile} from '../../shared-definitions/Profile';
import {User as baseUser} from '../../shared-definitions/User';

export interface LandlordUser extends baseUser {
  profile: Profile;
}
