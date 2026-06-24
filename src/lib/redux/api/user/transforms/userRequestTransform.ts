import type { CreateUserRequest, UpdateUserRequest } from "../types/requests";

export const transformCreateUserRequest = (request: CreateUserRequest) => ({
  cardNumber: request.cardNumber,
  userName: request.userName,
  phone: request.phone,
  address: request.address,
  wardNumber: request.wardNumber,
  locationId: request.locationId,
  balance: request.balance,
  monthlyCollectionAmount: request.monthlyCollectionAmount,
});

export const transformUpdateUserRequest = (request: UpdateUserRequest) => {
  return {
    cardNumber: request.cardNumber,
    userName: request.userName,
    phone: request.phone,
    address: request.address,
    wardNumber: request.wardNumber,
    locationId: request.locationId,
    balance: request.balance,
    monthlyCollectionAmount: request.monthlyCollectionAmount,
  };
};
