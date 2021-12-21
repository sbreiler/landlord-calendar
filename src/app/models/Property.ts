import {LandlordUser} from './LandlordUser';
import {Property as baseProperty} from '../../shared-definitions/Property';
import {Address} from '../../shared-definitions/Address';

export interface Property extends baseProperty {
  user: LandlordUser;
  address: Address;
}
