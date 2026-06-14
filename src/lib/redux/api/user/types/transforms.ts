import type { CreateUserRequest, UpdateUserRequest } from "./requests";
import type { DeleteUserResponse, UserListResponse, UserResponse } from "./responses";

export type UserRequestTransform = CreateUserRequest | UpdateUserRequest;
export type UserResponseTransform =
  | UserListResponse
  | UserResponse
  | DeleteUserResponse;
