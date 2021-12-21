import {gql} from 'apollo-angular';

export const getAppointments = gql`
  query getAppointments($start: DateTime!, $end: DateTime!) {
    appointments(start: $start, end: $end) {
      id,
      date,
      maxInviteeCount,
      attendeeCount,
      property {
        name,
        address {
          street,
          houseNumber,
          city,
          country,
          zipCode
        }
      }
    }
  }
`;

export const getAppointmentDetail = gql`
  query getAppointmentDetail($id: Int!) {
    appointment(id: $id) {
      id,
      date,
      maxInviteeCount,
      attendeeCount,
      showContactInformation,
      contact {
        firstName,
        name
      },
      property {
        id,
        name,
        inviteeCount,
        address {
          street,
          houseNumber,
          city,
          country,
          zipCode
        },
        attachments,
        user {
          profile {
            firstname,
            name,
            phone,
            gender,
            title
          },
          usertype
        }
      }
    }
  }
`;
