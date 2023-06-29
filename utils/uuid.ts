'use server';

import { randomUUID } from 'crypto';

export default async function getUUID() {
  'use server';
  return randomUUID();
}
