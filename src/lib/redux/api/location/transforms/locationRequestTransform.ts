import type {
  CreateLocationRequest,
  UpdateLocationRequest,
} from "../types/requests";

export const transformCreateLocationRequest = (request: CreateLocationRequest) => ({
  wardNumber: request.wardNumber,
  address: request.address,
  collector: request.collector,
});

export const transformUpdateLocationRequest = (request: UpdateLocationRequest) => {
  return {
    wardNumber: request.wardNumber,
    address: request.address,
    collector: request.collector,
  };
};
