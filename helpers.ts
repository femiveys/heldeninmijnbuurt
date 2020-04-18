export const sleep = (waitMs: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), waitMs);
  });
};

export const IS_SERVER = typeof window === "undefined";
export const IS_CLIENT = !IS_SERVER;
