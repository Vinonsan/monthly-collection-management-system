import type {
  CreateCollectionRequest,
  UpdateCollectionRequest,
} from "../types/requests";

export const transformCreateCollectionRequest = (request: CreateCollectionRequest) => ({
  cardNumber: request.cardNumber,
  userName: request.userName,
  ward: request.ward,
  monthlyCollectionAmount: request.monthlyCollectionAmount,
  balance: request.balance,
  paidAmount: request.paidAmount,
  lastPaidMonth: request.lastPaidMonth,
  status: request.status,
});

export const transformUpdateCollectionRequest = (request: UpdateCollectionRequest) => {
  return {
    cardNumber: request.cardNumber,
    userName: request.userName,
    ward: request.ward,
    monthlyCollectionAmount: request.monthlyCollectionAmount,
    balance: request.balance,
    paidAmount: request.paidAmount,
    lastPaidMonth: request.lastPaidMonth,
    status: request.status,
  };
};
