import type { QueryParams } from "../../_utils/queryParams";

export interface CollectionListRequest extends QueryParams {
  ward?: string | number;
}

export interface CreateCollectionRequest {
  cardNumber: string;
  userName: string;
  ward: string | number;
  monthlyCollectionAmount: number;
  balance: number;
  paidAmount: number;
  lastPaidMonth: string;
  status: string;
}

export interface UpdateCollectionRequest extends Partial<CreateCollectionRequest> {
  id: string;
}

export interface DeleteCollectionRequest {
  id: string;
}
