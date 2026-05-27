import type {
  DeleteLocationResponse,
  Location,
  LocationListResponse,
  LocationResponse,
  PaginationMeta,
} from "../types/responses";

const DEFAULT_META: PaginationMeta = {
  page: 1,
  pageSize: 10,
  total: 0,
  totalPages: 0,
};

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const toMeta = (value: unknown): PaginationMeta => {
  if (!isObject(value)) {
    return DEFAULT_META;
  }

  return {
    page: Number(value.page ?? DEFAULT_META.page),
    pageSize: Number(value.pageSize ?? value.limit ?? DEFAULT_META.pageSize),
    total: Number(value.total ?? DEFAULT_META.total),
    totalPages: Number(value.totalPages ?? DEFAULT_META.totalPages),
  };
};

export const transformLocationListResponse = (response: unknown): LocationListResponse => {
  if (Array.isArray(response)) {
    return { data: response as Location[], meta: DEFAULT_META };
  }

  if (!isObject(response)) {
    return { data: [], meta: DEFAULT_META };
  }

  const data = Array.isArray(response.data) ? response.data : response.items;

  return {
    data: Array.isArray(data) ? (data as Location[]) : [],
    meta: toMeta(response.meta ?? response.pagination),
  };
};

export const transformLocationResponse = (response: unknown): LocationResponse => {
  if (isObject(response) && isObject(response.data)) {
    return { data: response.data as unknown as Location };
  }

  return { data: response as Location };
};

export const transformDeleteLocationResponse = (
  response: unknown,
  id: string,
): DeleteLocationResponse => {
  if (isObject(response) && typeof response.success === "boolean") {
    return { success: response.success, id };
  }

  return { success: true, id };
};
