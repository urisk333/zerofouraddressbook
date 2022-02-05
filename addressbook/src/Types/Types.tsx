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
