import type { QueryParams } from "../../_utils/queryParams";

export interface UserListRequest extends QueryParams {
  locationId?: string;
}

export interface CreateUserRequest {
  cardNumber: string;
  userName: string;
  phone: string;
  address: string;
  wardNumber?: string | number;
  locationId?: string;
  balance: number;
  monthlyCollectionAmount: number;
}

export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: string;
}

export interface DeleteUserRequest {
  id: string;
}
