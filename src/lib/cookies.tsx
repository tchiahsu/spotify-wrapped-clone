export function setCookie(name: string, value: string, maxAgeSeconds: number) {
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax; Secure`;
}

export function getCookie(name: string): string | null {
  const key = `${encodeURIComponent(name)}=`;
  const parts = document.cookie.split("; ");
  const found = parts.find((p) => p.startsWith(key));
  return found ? decodeURIComponent(found.substring(key.length)) : null;
}

export function deleteCookie(name: string) {
  document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; Path=/; SameSite=Lax; Secure`;
}