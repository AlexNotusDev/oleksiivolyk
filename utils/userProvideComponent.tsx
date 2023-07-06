'use client';

import { createContext } from 'react';

export const UserContext = createContext();

export default function ProviderComponent({ value, children }) {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
