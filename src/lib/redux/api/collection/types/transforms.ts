import type {
  CreateCollectionRequest,
  UpdateCollectionRequest,
} from "./requests";
import type {
  CollectionListResponse,
  CollectionResponse,
  DeleteCollectionResponse,
} from "./responses";

export type CollectionRequestTransform =
  | CreateCollectionRequest
  | UpdateCollectionRequest;

export type CollectionResponseTransform =
  | CollectionListResponse
  | CollectionResponse
  | DeleteCollectionResponse;
