import { getRandomValues } from "node:crypto";

export const getRandomString = () => {
  const arr = new Uint32Array(1);
  return getRandomValues(arr)[0].toString(16);
};
