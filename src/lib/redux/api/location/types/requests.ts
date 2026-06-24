import type { QueryParams } from "../../_utils/queryParams";

export interface LocationListRequest extends QueryParams {
  collector?: string;
}

export interface CreateLocationRequest {
  wardNumber: string | number;
  address: string;
  collector: string;
}

export interface UpdateLocationRequest extends Partial<CreateLocationRequest> {
  id: string;
}

export interface DeleteLocationRequest {
  id: string;
}
