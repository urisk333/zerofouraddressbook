export type User = {
  email: string,
  password: string
}

export type Mocks = {
  userData: User,
}

export type LoginData = {
  email: string,
  password: string
}

export type UserContextState = {
  user: User;
  setUser: (user: User) => void;
};

export type Contact = {
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  mobilePhone: string,
  homePhone: string,
  email: string,
  pager: string
}

export type InitialData = {
  [key: string]: {
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    mobilePhone: string,
    homePhone: string,
    email: string,
    pager: string
  }
}
