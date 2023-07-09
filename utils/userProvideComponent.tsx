'use client';

import { createContext } from 'react';
import { User } from '@prisma/client';

export const UserContext = createContext<User>();

export default function ProviderComponent({ value, children }) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
