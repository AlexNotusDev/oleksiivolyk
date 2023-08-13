import { ReadonlyURLSearchParams } from 'next/navigation';

export default function queryCompose(
  key: string,
  value: string,
  searchParams: ReadonlyURLSearchParams | URLSearchParams | null,
): string {
  const params = new URLSearchParams(searchParams as URLSearchParams);
  if (value.length) {
    params.set(key, value);
  } else {
    params.delete(key);
  }

  return params.toString();
}
