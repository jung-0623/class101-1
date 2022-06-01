export interface User {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  author: User;
  body: string;
  timestamp: number;
  comments: Comment[];
  likeCount: number;
}

export interface Comment {
  id: number;
  author: User;
  body: string;
  timestamp: number;
}

export interface CreatePostRequest {
  body: string;
}
export interface CreatePostResponse {}

export interface CreatePostLikeRequest {
  postId: number;
}
export interface CreatePostLikeResponse {}

export interface CreateCommentRequest {
  postId: number;
  body: string;
}
export interface CreateCommentResponse {}

export interface ReadPostRequest {
  postId: number;
}
export interface ReadPostResponse {
  post: Post;
}

export interface ReadRandomPostRequest {}
export interface ReadRandomPostResponse {
  post: Post;
}

export interface UpdateProfileRequest {
  name: string;
}
export interface UpdateProfileResponse {}

export interface UpdatePostRequest {
  postId: number;
  body: string;
}
export interface UpdatePostResponse {}

export interface ReadProfileRequest {}
export interface ReadProfileResponse {
  user: User;
}

export interface Preview {
  id: number;
  body: string;
  timestamp: number;
}

export interface ReadPreviewRequest {}
export interface ReadPreviewResponse {
  posts: Preview[];
  comments: Preview[];
}

export interface ReadOAuth2UrlRequest {
  provider: OAuth2Provider;
}
export interface ReadOAuth2UrlResponse {
  url: string;
}

export interface DeleteSessionRequest {}
export interface DeleteSessionResponse {}

export interface IRpc {
  createPost: (req: CreatePostRequest) => CreatePostResponse;
  createComment: (req: CreateCommentRequest) => CreateCommentResponse;
  createPostLike: (req: CreatePostLikeRequest) => CreatePostLikeResponse;
  readPost: (req: ReadPostRequest) => ReadPostResponse;
  readRandomPost: (req: ReadRandomPostRequest) => ReadRandomPostResponse;
  readProfile: (req: ReadProfileRequest) => ReadProfileResponse;
  readPreview: (req: ReadPreviewRequest) => ReadPreviewResponse;
  updatePost: (req: UpdatePostRequest) => UpdatePostResponse;
  updateProfile: (req: UpdateProfileRequest) => UpdateProfileResponse;
  readOAuth2Url: (req: ReadOAuth2UrlRequest) => ReadOAuth2UrlResponse;
  deleteSession: (req: DeleteSessionRequest) => DeleteSessionResponse;
}

type AnyFunction = (...args: any) => any;
type PromiseReturn<F extends AnyFunction> = F extends (
  ...args: infer A
) => infer R
  ? (...args: A) => Promise<R>
  : never;

export type PromiseRpc = {
  [k in keyof IRpc]: PromiseReturn<IRpc[k]>;
};

export type RpcFunctionRequest<T extends keyof IRpc> = Parameters<IRpc[T]>[0];
export type RpcFunctionResponse<T extends keyof IRpc> = ReturnType<IRpc[T]>;

export type RpcRequest<T extends keyof IRpc> = {
  name: T;
  request: RpcFunctionRequest<T>;
};

export type RpcResponse<T extends keyof IRpc> = {
  error?: RpcError;
  response?: RpcFunctionResponse<T>;
};

export enum RpcError {
  Other,
  WrongRequest,
  NoUser,
  NoPost,
  Short,
  NoSession,
}

export enum OAuth2Provider {
  Kakao,
}
