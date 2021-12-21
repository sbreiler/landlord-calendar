import {Contact} from './Contact';
import {Property} from './Property';
import {Appointment as baseAppointment} from '../../shared-definitions/Appointment';
import {Id, OptionalId} from '../../shared-definitions/Id';

export interface Appointment extends baseAppointment {
  id: Id;
  contact?: Contact;
  property: Property;
  prev: OptionalId;
  next: OptionalId;
}
