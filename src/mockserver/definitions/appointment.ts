import * as _ from 'lodash';
import * as moment from 'moment';
import {DefaultResolver, FakeData} from '../helper';
import {Appointment as baseAppointment} from '../../shared-definitions/Appointment';
import {Id, WithId} from './withId';
import {Contact} from './contact';
import {Property} from './property';

export interface Appointment extends baseAppointment, WithId {
  mmntDate: moment.Moment; // for internal usage
  contactId: Id;
  propertyId: Id;
}

export const resolvers = (fakeData: FakeData): {byId: DefaultResolver, betweenDates: DefaultResolver} => {
  const byId: DefaultResolver = (__, {id}): Appointment|null =>
    _.find(fakeData.appointments, ['id', id]) ?? null;

  const betweenDates: DefaultResolver = (__, {start, end}): Appointment[] => {
    const mmntStart = moment(start);
    const mmntEnd = moment(end);

    return _.filter(
      fakeData.appointments,
        appointment => !(appointment.mmntDate.isBefore(mmntStart) || appointment.mmntDate.isAfter(mmntEnd))
    );
  };

  return {
    byId,
    betweenDates
  };
};

export const createAppointment = (
  id: Id,
  mmntDate: moment.Moment,
  maxInviteeCount: number,
  attendeeCount: number,
  contact: Contact,
  property: Property,
  showContactInformation: boolean = false
): Appointment =>
  ({
    id,
    mmntDate,
    date: mmntDate.toDate(),
    maxInviteeCount,
    attendeeCount,
    showContactInformation,
    contactId: contact.id,
    propertyId: property.id
  });

export const typeDef = `
  type Appointment {
    id: Int!
    date: DateTime!
    maxInviteeCount: Int!
    attendeeCount: Int!
    showContactInformation: Boolean!
    contact: Contact
    property: Property!
  }
`;
