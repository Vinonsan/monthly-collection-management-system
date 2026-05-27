import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { baseApi } from "./api/base/api";
import "./api/collection/api";
import "./api/location/api";
import "./api/user/api";
import { apiMiddleware } from "./middleware/apiMiddleware";
import authReducer from "./slices/auth";
import collectionReducer from "./slices/collection";
import commonReducer from "./slices/common";
import locationReducer from "./slices/location";
import userReducer from "./slices/user";

const rootReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  location: locationReducer,
  user: userReducer,
  collection: collectionReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiMiddleware, baseApi.middleware),
  });

  setupListeners(store.dispatch);

  return store;
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
