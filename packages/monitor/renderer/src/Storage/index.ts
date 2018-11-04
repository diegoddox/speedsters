export const set = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export const get = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  } catch {
    return undefined;
  }
}