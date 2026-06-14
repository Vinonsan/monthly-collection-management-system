import type {
  CreateLocationRequest,
  UpdateLocationRequest,
} from "./requests";
import type {
  DeleteLocationResponse,
  LocationListResponse,
  LocationResponse,
} from "./responses";

export type LocationRequestTransform =
  | CreateLocationRequest
  | UpdateLocationRequest;

export type LocationResponseTransform =
  | LocationListResponse
  | LocationResponse
  | DeleteLocationResponse;
