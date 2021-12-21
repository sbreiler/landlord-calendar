export enum Gender {
  NA = 'NA',
  FEMALE = 'FEMALE',
  MALE = 'MALE'
  // yeah, there are more, right?
}

export enum Title {
  NONE = 'NONE'
}

export interface Profile {
  firstname: string;
  name: string;
  phone: string;
  gender: Gender;
  title: Title;
}


