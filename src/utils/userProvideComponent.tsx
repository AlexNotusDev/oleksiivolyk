'use client';

import { createContext } from 'react';
import { User } from '@prisma/client';

export const UserContext = createContext<User | null>(null);

export default function ProviderComponent({ value, children }: { value: any; children: JSX.Element }) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
