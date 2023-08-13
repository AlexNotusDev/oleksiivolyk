import { ReadonlyURLSearchParams } from 'next/navigation';

export default function queryCompose(key: string, value: string, searchParams: ReadonlyURLSearchParams): string {
  const params = new URLSearchParams(searchParams);
  if (value.length) {
    params.set(key, value);
  } else {
    params.delete(key, value);
  }

  return params.toString();
}
