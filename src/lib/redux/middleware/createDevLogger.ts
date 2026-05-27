import type { Middleware } from "@reduxjs/toolkit";

export const createDevLogger = (): Middleware => (store) => (next) => (action) => {
  const result = next(action);

  if (process.env.NODE_ENV === "development") {
    console.debug("redux action", {
      action,
      state: store.getState(),
    });
  }

  return result;
};
