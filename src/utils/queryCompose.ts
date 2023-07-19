export default function queryCompose(params: { [key: string]: string }): string {
  return Object.keys(params)
    .map((key) => `${key}=${encodeURIComponent(params[key])}`)
    .join('&');
}
