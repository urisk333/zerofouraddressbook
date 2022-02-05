import { createContext } from 'react';
import { UserContextState, User } from 'Types/Types';

const context: UserContextState = {
    user: {
      email: '',
      password: ''
    },
    setUser: (user: User) => [{}]
};

const UserContext = createContext(context);

export { UserContext };
