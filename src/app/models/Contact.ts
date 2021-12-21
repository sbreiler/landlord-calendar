import {Contact as baseContact} from '../../shared-definitions/Contact';
import {Address} from '../../shared-definitions/Address';

export interface Contact extends baseContact {
  address: Address | {};
}

// todo: check if AnonymousContact is needed
export const AnonymousContact: Contact = {
  firstName: '',
  name: '',
  email: '',
  mobile: '',
  phone: '',
  address: {},
  fullName: ''
};
